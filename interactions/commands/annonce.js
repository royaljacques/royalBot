const {SlashCommandBuilder, TextInputStyle,MessageSelectMenu,  PermissionsBitField, ModalBuilder, TextInputBuilder, ActionRowBuilder,
    EmbedBuilder
} = require("discord.js");
const config = require("../../config.json");
let activeCommands = require("../../activeCommands.json")
module.exports = {
    data: new SlashCommandBuilder().setName("annonce").setDescription("envoie une annonce"),
    modal: true,
    active: activeCommands.interaction.annonce,
    async execute(interaction, client) {
        if (!interaction.guildId) {
            await interaction.reply({content: "tu ne peux pas utiliser cette commande dans un dm", ephemeral: true});
        }else{
            if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                let messageEmbed = new ModalBuilder()
                    .setCustomId('modal:annonce')
                    .setTitle('annonce');
                const titleAnnounce = new TextInputBuilder()
                    .setCustomId('titleAnnounce')
                    .setLabel("quel est le titre de ton annonce")
                    .setStyle(TextInputStyle.Short);
                const descriptionAnnounce = new TextInputBuilder()
                    .setCustomId('descriptionAnnounce')
                    .setLabel("quel est la description de ton annonce")
                    .setStyle(TextInputStyle.Paragraph);
                const firstActionRow = new ActionRowBuilder().addComponents(titleAnnounce);
                const SecondeActionRow = new ActionRowBuilder().addComponents(descriptionAnnounce);
                messageEmbed.addComponents(firstActionRow, SecondeActionRow);
                await interaction.showModal(messageEmbed);
            }else{
                interaction.reply("tu n'as pas la permission d'utiliser cette commande");
            }
        }
    },
}