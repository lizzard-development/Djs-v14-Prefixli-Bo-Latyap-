const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();
const komutlarPath = path.join(__dirname, 'komutlar');
const komutDosyalari = fs.readdirSync(komutlarPath).filter(file => file.endsWith('.js'));

for (const dosya of komutDosyalari) {
  const dosyaYolu = path.join(komutlarPath, dosya);
  const komut = require(dosyaYolu);
  client.commands.set(komut.name, komut);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  client.on(event.name, (...args) => event.execute(...args, client));
}

client.on('messageCreate', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Komut çalıştırılırken hata oluştu!');
  }
});

client.login(config.token);
