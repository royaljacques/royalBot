const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
let config = require("../../config.json");
const avisModel = require("../../database/models/avisModel");
let activeCommands = require("../../activeCommands.json")
module.exports = {
    data: new SlashCommandBuilder().setName("avis").setDescription("envoie un petit avis sur nos services")
        .addIntegerOption(option => option.setName("note").setDescription("note sur 10").setRequired(true))
        .addStringOption(option => option.setName("avis").setDescription("votre avis").setRequired(true))
        .addBooleanOption(option => option.setName("anonyme").setDescription("votre avis sera anonyme")),
    active: activeCommands.interaction.avis,
    async execute(interaction, client) {
        let note = interaction.options.getInteger("note");
        let avis = interaction.options.getString("avis");
        let anonyme = interaction.options.getBoolean("anonyme");
        if (note > 10 || note < 0) {
            return interaction.reply({content: "la note doit être comprise entre 0 et 10", ephemeral: true});
        }
        let username = "de anonyme";
        let serverAvatar = interaction.guild.iconURL();
        if (!anonyme) {
            username = interaction.user.username;
            serverAvatar = interaction.user.avatarURL();
        }
        let stars = "";
        for (let i = 0; i < note; i++) {
            stars += "⭐";
        }
        let embed = new EmbedBuilder()
            .setTitle("avis " + username)
            .setDescription(avis)
            .addFields([
                {name: "note", value: stars, inline: true},
            ])
            .setThumbnail(serverAvatar)
            .setTimestamp()
        let channels = interaction.guild.channels.cache.get(config.channel.avis)
        interaction.reply({content: "votre avis a bien été envoyé", ephemeral: true});
        let envoie = await channels.send({embeds: [embed]})
        let idSend = envoie.id;
        const AvisModel = new avisModel({
            messageId: idSend,
            note: note,
            avis: avis,
            discordId: interaction.user.id
        })
        await AvisModel.save();
    }
}