module.exports = async (bot) => {
  console.log(`Successfully logged in as ${bot.user.tag}`);
  bot.user.setActivity('CHS Tech Club', {type: "WATCHING"});
}
