module.exports = {
  name: 'ping',
  description: 'Botun ping değerini gösterir.',
  execute(message) {
    message.reply(`Pong! Gecikme: ${Date.now() - message.createdTimestamp}ms`);
  }
};