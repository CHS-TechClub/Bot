module.exports.run = async (bot, msg, args) => {

  let input = args[0];
  if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
      msg.channel.send("You cant use this command since you're missing `manage_msgs` perm");
      return;
  }

  if (isNaN(input)) {
    return msg.channel.send('enter the amount of msgs that you would like to clear').then((sent) => {
      setTimeout(() => {
        sent.delete();
      }, 2500);
    });
  }

  if (Number(input) < 0) {
    return msg.channel
      .send('enter a positive number')
      .then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 2500);
      });
  }

  // add an extra to delete the current msg too
  const amount = Number(input) >= 100 ? 99 : Number(input);
  msg.channel.bulkDelete(amount, true).then((_msg) => {
    msg.channel.send(`Bot cleared \`${_msg.size}\` messages :broom:`).then((sent) => {
      setTimeout(() => {
        sent.delete();
      }, 2500);
    })
  });

}
