const Discord = require('discord.js');
const { hasRole } = require("../utils/permissions");

module.exports.run = async (bot, msg, args) => {

  if (hasRole(msg.member, msg.guild, "Council Member")) {

    let chsGuild = bot.guilds.cache.get(bot.config.homeGuild);
    chsGuild.members.cache.each(member => {
      
    })
    msg.react("✅").catch((e) => {});

  } else {
    msg.channel.send("Only Council Members can perform this command!");
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
