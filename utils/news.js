const { toHTML } = require('discord-markdown');

class NewsManager {

  static async broadcastNews(io, msg) {
    let date = new Date();
    let hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = `0${date.getMinutes()}`;
    let dateTime = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} @ ${hours[date.getHours()]}:${minutes}`
    let htmlContent = toHTML(msg.content);
    let content = htmlContent.replace(/\n/g, "<br>");
    io.emit('news', {author: msg.author.username, avatar: msg.author.avatarURL, content: content, dateTime: dateTime});
  }

}

module.exports = NewsManager;
