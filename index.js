const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'komutlar');
fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')).forEach(file => {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command);
});


const eventsPath = path.join(__dirname, 'events');
fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')).forEach(file => {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args));
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args));
  }
});


client.on('messageCreate', message => {
  if (!message.guild || message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Komut çalıştırılırken bir hata oluştu.');
  }
});

client.login(config.token);



// ARES CODE V14 PREFİXLİ BOŞ ALTYAPI \\

