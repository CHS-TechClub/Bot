const { Client } = require('discord.js');

// TODO: setup the news channel and home guild in config

class Bot extends Client {
  constructor() {
    super();

    this.djs = require('discord.js');
    this.config = require("./config.json");
    this.fs = require("fs");
    this.mysql = require("mysql");
    this.db; //defined in registerDatabaseConnection() just initalized here
    this.commands = new Map();

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
        if (!file.endsWith(".js")) return
        let path = require(`./listeners/${file}`);
        let name = file.split(".")[0];

        this.on(name, path.bind(null, this));

        registered.push(name);
      });
      console.log(`[Listener] Registered Listeners: ${registered.map(r => r).join(', ')}.`);
    });
  }

  async registerDatabaseConnection() {
    let mysqlInfo = this.config.mysql;
    this.db = this.mysql.createConnection({
      host: mysqlInfo.host,
      user: mysqlInfo.username,
      password: mysqlInfo.password,
      database: mysqlInfo.databse
    });

    console.log("[Database] Connected!");
  }

  async start() {
    await this.registerCommands();
    await this.registerListeners();
    await this.registerDatabaseConnection();
    await this.login(this.config.token);
  }

}

module.exports = Bot;
