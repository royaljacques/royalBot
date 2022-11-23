const {SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js");
let config = require("../../config.json");
const avisModel = require("../../database/models/avisModel");
let activeCommands = require("./../../activeCommands.json")
module.exports = {
    data: new SlashCommandBuilder().setName("suggest").setDescription("envoie un petit avis sur nos services"),
    active: activeCommands.interaction.suggest,
    async execute(interaction, client) {
        let messageEmbed = new ModalBuilder()
            .setCustomId('modal:suggest')
            .setTitle('annonce');
        const descriptionAnnounce = new TextInputBuilder()
            .setCustomId('suggestion:description')
            .setLabel("quel est ta suggestion? ")
            .setStyle(TextInputStyle.Paragraph);
        const SecondeActionRow = new ActionRowBuilder().addComponents(descriptionAnnounce);
        messageEmbed.addComponents(SecondeActionRow);
        await interaction.showModal(messageEmbed);
    }
}