const fs = require('fs');
const paths = require("node:path");
const {Collection} = require("discord.js");
const pluginFolder = __dirname + "/" + "plugins";
const CommandsLoader = require("./utils/commandsLoader");
const { REST, Routes } = require('discord.js');
const {loadCommands} = require("./utils/pluginCommandsLoader");
require('dotenv').config();

module.exports = (client)=>{
    function getMyRecursiveScanDir(path){
        const files = fs.readdirSync(path);
        for (const file of files){
            fs.lstat(path + "/" + file, (err, stats) => {
                if (stats.isDirectory()){
                    getMyRecursiveScanDir(path + "/" + file);
                }
                if (stats.isFile()){
                    if (file === 'plugin.json'){
                        const jsonfile = require(path + '/' + file);
                        registerPlugins(path, jsonfile.name)
                    }
                }
            })
        }
    }
    getMyRecursiveScanDir(pluginFolder)

    function registerPlugins(path, name){

        loadCommands(client, path).then(r => {}).catch(e => console.log(e));

        const eventsPath = paths.join(path, 'events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const filePath = paths.join(eventsPath, file);
            const event = require(filePath);
            console.log("\033[0;32m[nouvel event]\033[0;00m: " + event.name + "✅")
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => {
                    event.execute(...args, client);
                });
            }
        }


        console.warn("\033[0;31m ------------------------------\n\033[0;00mPlugin détécté: " + name  +", load avec succès ✅ ")

    }
}

