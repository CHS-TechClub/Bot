module.exports = async (bot, msg) => {
  //Disable DM's
  if (msg.author.bot) return;
  if (msg.channel.type !== "text") return;

  let newsChannel = bot.config.newsChannel || process.env.newsChannel;
  if (msg.channel.id == newsChannel) {
    await bot.NewsManager.broadcastNews(bot.newsSocket, msg);
    return;
  }

  let prefix = bot.config.prefix || process.env.prefix;
  let args = msg.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  let cmd = bot.commands.get(command);
  if (!cmd) return;

  if (msg.content.startsWith(prefix)) cmd.run(bot, msg, args);
  if (msg.content.startsWith("?")) cmd.help(bot, msg, args);

}
