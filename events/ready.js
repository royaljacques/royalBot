const discordProfile = require('./../database/models/discordProfil.js');

module.exports = {
    name: "ready",
    once: true,
   async execute(client) {
       client.guilds.cache.map(function (e) {
           console.log(e.name)
       })

            //check les bans dans la db


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