const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    
    const presenceConfig = client.config.presence;
    
    client.user.setPresence({
      activities: [{
        name: presenceConfig.message,
        type: ActivityType[presenceConfig.type]
      }],
      status: presenceConfig.status
    });

    const sunucuSayisi = client.guilds.cache.size;
    const kullaniciSayisi = client.guilds.cache.reduce((toplam, guild) => toplam + guild.memberCount, 0);

    console.log(`\n[🤖] ${client.user.tag} aktif edildi!`);
    console.log(`[❕] Prefix: ${client.config.prefix}`);
    console.log(`[🌐] ${sunucuSayisi} sunucu | ${kullaniciSayisi} kullanıcı`);
    console.log(`[🎮] Durum: ${presenceConfig.type} ${presenceConfig.message}\n`);
  }
};
