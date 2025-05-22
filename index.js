require("dotenv").config();
require("./keepAlive.js");

const config = require("./TimePercent/config.json"); // teste local
const { GatewayIntentBits } = require("discord.js");
const OpenAI = require("openai");
const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

const prefix = process.env.PREFIX || "%";
// const token = process.env.TOKEN;
const token = config.token;
const ChatGPTKey = process.env.OPENAI_API_KEY
const key = config.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: key });
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

client.commands = new Discord.Collection();
const commands = fs
  .readdirSync("./Commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commands) {
  const nameCommand = file.split(".")[0];
  const command = require(`./Commands/${nameCommand}`);
  console.log(`Trying command: ${nameCommand}`);
  client.commands.set(nameCommand, command);
}

client.on("ready", () => {
  console.log(`Online in -> ${client.user.tag}!`);
  client.user.setActivity("A Vontade dos Mares | %ajuda", { type: 0 });
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;

  // Comando com prefixo
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const nameCommand = args.shift();
    const command = client.commands.get(nameCommand);
    if (!command) return;
    command.run(client, msg, args);
    return;
  }

  // Mencionado por @
  if (msg.mentions.has(client.user)) {
    try {
      await msg.channel.sendTyping();

      const prompt = msg.content.replace(/<@!?(\d+)>/, "").trim();
      if (!prompt) return msg.reply("Me diga algo!");

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Você é Frederico Nito, um Mink Castor que faz parte do universo de RPG 'A Vontade dos Mares' (feito para jogar no cenário de One Piece). Você é esperto, simpático e um pouco ingênuo. Você sempre responde como um irmão mais velho do usuário. Você faz algumas pausas ao falar, separadas por 'éh...'",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 200,
      });

      const resposta = completion.choices[0].message.content;
      msg.reply(resposta);
    } catch (err) {
      console.error("Erro na resposta do ChatGPT:", err);
      msg.reply("Tive um problema ao tentar responder... tente novamente.");
    }
  }
});

client.login(token);
