module.exports = {
  name: "örnek",
  description: "Bu bir örnek komuttur",
  execute(message, args) {
    // Komutun işlevleri buraya gelicek
    message.channel.send("Örnek komut çalıştı!");
  }
};
