module.exports =  {
    name:"interactionCreate",
    once: false,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
        }else if (interaction.isModalSubmit()){
            let modalInteraction = interaction.client.modals.get(interaction.customId);
            if(modalInteraction){
                try{
                    await modalInteraction.executeModal(interaction, client);
                }catch (e){
                    console.log(e)
                }
            }
        }else if (interaction.isContextMenuCommand()){
            let context = interaction.client.context.get(interaction.commandName);
            if(context){
                try{
                    await context.execute(interaction, client);
                }catch (e) {
                    console.log(e)
                }
            }

        }else if (interaction.isButton()){
            let button = interaction.client.buttons.get(interaction.customId);

            if(button){
                try{
                    await button.execute(interaction, client);
                }catch (e) {
                    console.log(e)
                }
            }
        }
    }
}