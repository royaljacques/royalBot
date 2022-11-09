const {Client, REST, Routes, Collection, Partials} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const database = require('./database/databaseConnect.js');
const pluginLoader = require("./pluginLoader");
require('dotenv').config();
const commandsLoader = require("./utils/commandsLoader");

console.log(process.env.MONGO_URI)
database.connect(process.env.MONGO_URI).then(async (e) => {



   }).catch((err) => { console.log(err) });

const client = new Client({intents: [3276799], partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember]});
client.context = new Collection();
client.modals = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
commandsLoader.loadCommands(client, __dirname).then(r => console.log("commands ok")).catch(e => console.log(e));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => {
            event.execute(...args, client);
        });
    }
}
pluginLoader(client)

client.login(process.env.TOKEN).then(r => {}).catch(e => console.log(e));


