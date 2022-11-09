const {ContextMenuCommandBuilder, PermissionsBitField, ApplicationCommandType } = require("discord.js");
const config = require("../../config.json");
const avisModel = require("../../database/models/avisModel");
let activeCommands = require("../../activeCommands.json")
module.exports = {
    data: new ContextMenuCommandBuilder().setName("getavismessage").setType(ApplicationCommandType.Message),
    context: true,
    active: activeCommands.contexts.getAvis,
    async execute(interaction, client) {
        if(interaction.targetMessage.channelId === config.channel.avis){
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                interaction.reply("Vous n'avez pas la permission d'utiliser cette commande");
            }else {
                let interactionId = interaction.targetMessage.id;
                let data = await avisModel.findOne({messageId: interactionId});
                let userRequest = interaction.user;
                if (data) {
                    let data = await avisModel.findOne({messageId: interactionId});
                    if (data) {
                        let userId = data.discordId;
                        userRequest.send({content: "voici l'avis de `" + userId + "` : `" + data.avis + " ` avec une note de `" + data.note + "/10`"});
                        interaction.reply("avis envoyé en mp");
                        setTimeout(() => {
                            interaction.deleteReply();
                        }, 3000);
                    } else {
                        userRequest.send("ce message n'est pas un avis")
                    }
                }
            }
        }else {
           const reply = await interaction.reply("ce n'est pas un message d'avis")
            setTimeout(() => {
                interaction.deleteReply()
            }, 3000);
        }

    }
}