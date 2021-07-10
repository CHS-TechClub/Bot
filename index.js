const { Client } = require('discord.js');

// TODO: setup the news channel and home guild in config

class Bot extends Client {
  constructor() {
    super();

    this.djs = require('discord.js');
    this.config = require("./config.json");
    this.fs = require("fs");
    this.toHTML = require('discord-markdown');
    this.express = require('express');
    this.app = this.express();
    this.http = require('http').Server(this.app);
    this.ioClient = require('socket.io-client');
    this.newsSocket;
    this.NewsManager = require("./utils/news.js");
    this.db; //defined in registerDatabaseConnection() just initalized here
    this.commands = new Map();

    this.port = process.env.PORT || 8001;

  }

  /*
  USE ASYNC
  NodeJs is single threaded so we want to queue this stuff so it takes less CPU cycles to start the Bot
  */

  async registerCommands() {
    this.fs.readdir("./commands/", async (e, files) => {
      if (e) return console.log(`[TechBot] Error whilst reading command dir: ${e}`);
      if (!files) return console.error("[TechBot] Command directory missing!");

      let registeredCommands = [];
      for (const file of files) {
        if (!file.endsWith(".js")) return;
        let path = require(`./commands/${file}`);
        let name = file.split(".")[0];
        let aliases = path.aliases;

        this.commands.set(name, path);

        if (aliases) {
          for (var a of aliases) {
            if (this.commands.get(a)) return console.log(`Error: alias ${a} has already been registered.`);
            else this.commands.set(a, path);
          }
        }
        registeredCommands.push(name);
      };
      console.log(`[Commands] Registered Commands: ${registeredCommands.map(c => c).join(', ')}.`);
    });
  }

  async registerListeners() {
    //Again copied from PDCL cause it works and it works well
    this.fs.readdir("./listeners/", (e, listeners) => {
      if (e) return console.log(`[TechBot] Error whilst reading listener dir: ${e}`);
      if (!listeners) return console.log("[TechBot] Error whilst reading listener directory.");

      let registered = [];
      listeners.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let path = require(`./listeners/${file}`);
        let name = file.split(".")[0];

        this.on(name, path.bind(null, this));

        registered.push(name);
      });
      console.log(`[Listener] Registered Listeners: ${registered.map(r => r).join(', ')}.`);
    });
  }

  async registerApp() {
    let bot = this;
    this.app.get('/', (req, res) => {
      res.send("connected");
    })

    this.app.get('/status', (req, res) => {
      let data = [bot.ping, "ok"];
      res.send(data);
    })

    this.http.listen(this.port, () => {
      console.log(`Listening status container of port: ${this.port}`);
    });
  }

  async registerSocketClient() {
    let path = "ws://chstechclub.herokuapp.com/";
    this.newsSocket = this.ioClient.connect(path, {reconnect: true}); //TODO: logic for localhost or the website url

    this.newsSocket.on('connect', (socket) => {
      console.log(`[Socket] Connected to the website! ${path}`);
    });

    this.newsSocket.on('disconnect', () => {
      console.log("[Socket] Disconnected from the website!");
    })
  }

  async start() {
    await this.registerCommands();
    await this.registerListeners();
    await this.registerApp();
    await this.registerSocketClient();
    await this.login(this.config.token);
  }

}

module.exports = Bot;
