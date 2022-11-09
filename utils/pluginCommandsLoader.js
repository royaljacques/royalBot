const path = require("node:path");
const fs = require("node:fs");

module.exports = {
    async loadCommands(client, basicpath){
        function loadBasicCommands(client, basicpath){
            const commandsPath = path.join(basicpath , '/interactions/commands');
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);

                    client.commands.set(command.data.name, command);
                    console.log("\033[0;00mnouvelle commande: " + command.data.name + "✅")


            }
        }

        function loadModalInteraction(client, basicpath){
            const commandsPath = path.join(basicpath , '/interactions/modals');
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                client.modals.set(command.name, command);
                console.log("\033[0;00mnouveau modal: " + command.name + " ✅ ")
            }
        }

        function loadContextInteraction(client, basicpath){
            const commandsPath = path.join(basicpath , '/interactions/contexts');
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);

                    client.context.set(command.data.name, command);
                    console.log("\033[0;00mnouveau modal: " + command.data.name + " ✅ ")


            }
        }
        function loadButtonInteraction(client, basicpath){
            const commandsPath = path.join(basicpath , '/interactions/buttons');
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);

                client.buttons.set(command.name, command);

                console.log("\033[0;00mnouveau boutton: " + command.name + " ✅ ")
            }
        }
        loadBasicCommands(client, basicpath);
        loadModalInteraction(client, basicpath);
        loadContextInteraction(client, basicpath);
        loadButtonInteraction(client, basicpath);
    }
}