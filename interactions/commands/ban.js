const {SlashCommandBuilder, TextInputStyle, ModalBuilder, ActionRowBuilder, TextInputBuilder} = require("discord.js");
let activeCommands = require("../../activeCommands.json")
module.exports = {
    data: new SlashCommandBuilder().setName("ban").setDescription("Ban a user")
        .addMentionableOption(option => option.setName("user").setDescription("The user to ban").setRequired(true)),
    active: activeCommands.interaction.ban,
    async execute(interaction, client) {
        //généré un modal form
        const modal = new ModalBuilder()
            .setCustomId('modal:ban')
            .setTitle('Ban a user')
        const time = new TextInputBuilder()
            .setCustomId('time')
            // The label is the prompt the user sees for this input
            .setLabel("temps de ban (en jours) non obligatoire ")
            // Short means only a single line of text
            .setPlaceholder('si aucun temps marqué, ban à vie')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);
        const reason = new TextInputBuilder()
            .setCustomId('raison')
            .setLabel("écrit la raison du ban")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
        const userId = interaction.options.getMentionable("user").id;
        const userText = new TextInputBuilder()
            .setCustomId('user')
            .setLabel(interaction.options.getMentionable("user").user.username)
            .setStyle(TextInputStyle.Short)
            .setValue(userId)

        const firstActionRow = new ActionRowBuilder().addComponents(time);
        const SecondeActionRow = new ActionRowBuilder().addComponents(reason);
        const Tr = new ActionRowBuilder().addComponents(userText);
        modal.addComponents(firstActionRow, SecondeActionRow, Tr);
        await interaction.showModal(modal);
    }
}