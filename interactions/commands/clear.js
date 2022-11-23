const {SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");
let activeCommands = require("./../../activeCommands.json")
module.exports = {
    data: new SlashCommandBuilder().setName("clear").setDescription("clear les messages").addNumberOption(option => option.setName("nombre").setDescription("nombre de message a supprimer").setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    active: activeCommands.interaction.clear,
    async execute(interaction, client) {
        if (!interaction.guildId) {
            await interaction.reply({content: "tu ne peux pas utiliser cette commande dans un dm", ephemeral: true});
        }else{
            let nombre = interaction.options.getNumber("nombre");
            if (nombre > 100) {
                interaction.reply("tu ne peux pas supprimer plus de 100 messages");
            }else{
                let channel = interaction.channel;
                if (nombre >= 100) {
                    await interaction.reply({content: "tu ne peux pas supprimer plus de"})
                }
                let messages = await channel.messages.fetch({limit: nombre});
                messages.forEach(message => {
                    message.delete();
                });
                interaction.reply("messages supprimés");
            }
        }
    }
}