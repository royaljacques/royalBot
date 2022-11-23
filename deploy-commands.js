const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const paths = require("node:path");
require('dotenv').config();
const commands = [];
const commandsPath = path.join(__dirname, 'interactions', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

let nbr = 0;
let nbr2 = 0;
async function registerBasicCommands() {
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        console.log("Commande détéctée: " + command.data.name + "✅")
        commands.push(command.data.toJSON());
    }
    const commandsPathss = path.join(__dirname, 'interactions', 'contexts');
    const commandFiless = fs.readdirSync(commandsPathss).filter(file => file.endsWith('.js'));

    for (const file of commandFiless) {
        const filePaths = path.join(commandsPathss, file);
        const command = require(filePaths);
        console.log("Commande détéctée: " + command.data.name + "✅")
        commands.push(command.data.toJSON());
    }
    const files = fs.readdirSync(__dirname + "/" + "plugins");
    nbr = files.length;
    for (const file of files) {
        fs.lstat(__dirname + "/" + "plugins" + "/" + file, (err, stats) => {
            if (stats.isDirectory()) {
                const pluginFolder = __dirname + "/" + "plugins" + "/" + file;
                const commandsPath = pluginFolder + "/" + 'interactions' + "/" + 'commands';
                const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const filePath = commandsPath + "/" + file;
                    const command = require(filePath);
                    console.log("Commande détéctée: " + command.data.name + "✅")
                    commands.push(command.data.toJSON());
                }
            }
        })
        fs.lstat(__dirname + "/" + "plugins" + "/" + file, (err, stats) => {
            if (stats.isDirectory()) {
                const pluginFolder = __dirname + "/" + "plugins" + "/" + file;
                const commandsPath = pluginFolder + "/" + 'interactions' + "/" + 'contexts';
                const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const filePath = commandsPath + "/" + file;
                    const command = require(filePath);
                    console.log(command)
                    console.log("Commande détéctée: " + command.data.name + "✅")
                    commands.push(command.data.toJSON());
                }

            }
        })
        nbr2++;
    }
}

registerBasicCommands().then(async () => {

   /*
    await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        {body: []},
    );
    */
    let inter =  setInterval(async () => {
        if (nbr === nbr2){
            try {
                console.log('Started refreshing application (/) commands.');
                await rest.put(
                    Routes.applicationCommands(process.env.CLIENT_ID),
                    {body: commands},
                ); //console.log(r)
                console.log('Successfully reloaded application (/) commands. ' + commands.length);
                a();
            }catch (e) {
                console.log(e)
            }
        }
    }, 1000)

    function a(){
        clearInterval(inter)
    }

})





