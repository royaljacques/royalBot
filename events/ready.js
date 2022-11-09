const discordProfile = require('../database/models/discordProfil.js');
const banModel = require('../database/models/banModel.js');
module.exports = {
    name: "ready",
    once: true,
   async execute(client) {
        setInterval(async () => {
            //check les bans dans la db
            let bans = await banModel.find();
            bans.forEach(async (ban) => {
                //vérifier si le temps est dépassé
                if (ban.time.getDay() < new Date().getDay()) {

                }else {
                    //verfie si il l"user est bannis du sereur
                    let discordId = ban.discordId;
                    let user = await client.guilds.cache.get(process.env.GUILD_ID).bans.fetch(discordId);
                    if (user) {
                        //unban l'user
                        client.guilds.cache.get(process.env.GUILD_ID).members.unban(discordId);
                        //supprime le ban de la db
                        await banModel.deleteOne({discordId: discordId});
                    }

                }
            })
        }, 3000);
    }
}
// discordProfile.findOne({discordId: discordId}, (err, data) => {
//                 if (err) throw err;
//                 if (!data) {
//                     const newDiscordProfile = new discordProfile({
//                         discordId: discordId,
//                         joinAt: joinedAt,
//                     });
//                     newDiscordProfile.save();
//                 } else {
//                     //console.log("User already in database");
//                 }
//             });