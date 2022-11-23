const {EmbedBuilder} = require("discord.js");
const config = require("./../../config.json");
module.exports = {
    name: "'modal:suggest",
    async executeModal(interaction, client) {
        await interaction.reply({ content: 'ta suggestion à bien été envoyée' });
        let embed = new EmbedBuilder()
            .setTitle("nouvelle suggestion")
            .setDescription(interaction.fields.getTextInputValue("suggestion:description"))
        let channels = interaction.guild.channels.cache.get(config.channel.suggestion)
        channels.send({embeds: [embed]})
    }
}