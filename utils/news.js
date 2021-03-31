class NewsManager {

  static async broadcastNews(io, msg) {
    io.emit('news', `${msg.content}`);
  }

}

module.exports = NewsManager;
