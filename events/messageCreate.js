const discordLeves = require('../database/models/discordLevels');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        if (message.content.startsWith("!")){
            if (message.channel.type === 1){
            }else if (message.channel.type === 0){

            }
        }
        if(!message.author.bot){
            discordLeves.findOne({discordId: message.author.id}, async (err, data) => {
                if(err) throw err;
                if(!data) {
                    const newDiscordProfile = new discordLeves({
                        discordId: message.author.id,
                        experience: 0,
                        level: 0,
                    });
                    await newDiscordProfile.save();
                } else {
                    if (data.experience >= data.xpMax) {
                        data.experience = 0;
                        data.level++;
                        data.xpMax = data.level * 100;
                        data.save();
                        message.channel.send(`tu viens de augmenter ton niveau, bien joué ! tu es maintenant niveau ${data.level}`);
                    }else {
                        data.experience++;
                        data.save();
                    }
                }
            });
        }
    }
}