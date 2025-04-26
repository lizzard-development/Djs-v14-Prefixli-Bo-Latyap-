module.exports = {
  name: "ping",
  description: "Botun gecikme süresini gösterir",
  execute(message) {
    message.channel.send(`🏓 Gecikme: **${Date.now() - message.createdTimestamp}ms**`);
  }
};
