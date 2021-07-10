const Discord = require('discord.js');
const { hasRole } = require("../utils/permissions");

module.exports.run = async (bot, msg, args) => {

  if (hasRole(msg, "Council Member")) {
    msg.channel.send("You have permission!");
  } else {
    msg.channel.send("You do not have permission!");
  }

}

module.exports.help = async (bot, msg, args) => {
  let helpEmbed = new Discord.MessageEmbed()
  .setAuthor(bot.user.tag, bot.user.displayAvatarURL)
  .addField("Description:", "Update the grades of all students...")
  .addField("Usage:", "`!updategrades`", true)
  .addField("Example:", "`!updategrades`", true)
  .setColor("GREEN")
  .setFooter("!updategrades")
  .setTimestamp();

  msg.channel.send({embed: helpEmbed});
}
