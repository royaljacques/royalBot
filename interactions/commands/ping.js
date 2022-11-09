const {SlashCommandBuilder} = require("discord.js");
let activeCommands = require("../../activeCommands.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('renvoie le ping du bot'),
    active: activeCommands.interaction.ping,
    async execute(interaction, client) {
        if (!interaction.guildId) {
            await interaction.reply({content: "tu ne peux pas utiliser cette commande dans un dm", ephemeral: true});
            return;
        }
        interaction.channel.send('pinging').then(m => {
            m.edit(`🏓Latency is ${m.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        });
    }

}