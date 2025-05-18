require("dotenv").config();
require("./keepAlive.js");

const { GatewayIntentBits, messageLink } = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ],
});
const prefix = process.env.PREFIX || "%";
const token = process.env.TOKEN;
const fs = require("fs");

client.commands = new Discord.Collection();
const commands = fs
    .readdirSync("./Commands")
    .filter((file) => file.endsWith(".js"));
// for de busca comandos na subpasta
for (file of commands) {
    const nameCommand = file.split(".")[0];
    const command = require(`./Commands/${nameCommand}`);
    console.log(`Trying command: ${nameCommand}`); // testando comando requerido
    client.commands.set(nameCommand, command);
}

// online console alert
client.on("ready", () => {
    console.log(`Online in -> ${client.user.tag}!`);
    client.user.setActivity('A Vontade dos Mares', { type: 0 });
});

// handler?
client.on("messageCreate", (msg) => {
    if (msg.content.startsWith(prefix)) {
        //const info = msg.content.toLowerCase()
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const nameCommand = args.shift();
        const command = client.commands.get(nameCommand);
        //console.log(`${args.slice(0)}`)
        if (!command) return;
        command.run(client, msg, args);
    }
});

// bot on
client.login(token);
