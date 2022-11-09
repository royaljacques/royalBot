const {EmbedBuilder} = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "modal:annonce",
    async executeModal(interaction, client) {
        await interaction.reply({ content: 'ton annonce a bien été envoyé' });
        let embed = new EmbedBuilder()
            .setTitle(interaction.fields.getTextInputValue("titleAnnounce"))
            .setDescription(interaction.fields.getTextInputValue("descriptionAnnounce"))
        let channels = interaction.guild.channels.cache.get(config.channel.annonce)
        channels.send({embeds: [embed]})
    }
}