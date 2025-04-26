module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    const config = require('../config.json');
    const prefix = config.prefix;
    const botName = client.user.tag;
    const serverCount = client.guilds.cache.size;
    const userCount = client.users.cache.size;

    
    client.user.setPresence({ activities: [{ name: `Ares Code`}], status: 'online' });

    
    console.log(`✅ Bot hazır!
Prefix: ${prefix}
Bot: ${botName}
Sunucu Sayısı: ${serverCount}
Kullanıcı Sayısı: ${userCount}`);
  }
};