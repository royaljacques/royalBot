const {SlashCommandBuilder, PermissionsBitField} = require("discord.js");
let activeCommands = require("../../activeCommands.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('une commande pour evaluer du code').addStringOption(option => option.setName("event").setDescription("l'event à lancer").setRequired(true)).addMentionableOption(option => option.setName("user").setDescription("l'utilisateur à mentionner").setRequired(true)),
    active: activeCommands.interaction.eval,
    async execute(interaction, client) {

        if (!interaction.guildId) {
            await interaction.reply({content: "tu ne peux pas utiliser cette commande dans un dm", ephemeral: true});
            return;
        }
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            interaction.reply("Vous n'avez pas la permission d'utiliser cette commande");
        }else {
            client.emit("guildMemberAdd", interaction.options.getMentionable("user"));
            interaction.reply("its ok ")
        }

    }

}