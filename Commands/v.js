const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "v",
  run: async (client, msg, args) => {
    const author = msg.author;
    const isIncite = args.length === 0;

    // Função: emoji por valor
    const dieEmoji = (v, hunger = false) => {
      if (hunger) return `🩸${v}`;
      return `🎲${v}`;
    };

    if (isIncite) {
      const value = Math.ceil(Math.random() * 10);
      const success = value >= 6;
      const embed = new EmbedBuilder()
        .setTitle("🩸 Incitar Sangue")
        .setDescription(`Resultado: ${dieEmoji(value, true)}\nVocê ${success ? "**controla a Fome.**" : "**aumenta sua Fome em 1.**"}`)
        .setColor(success ? 0x0099ff : 0xff0000)
        .setFooter({ text: `${author.username}`, iconURL: author.displayAvatarURL() });
      return msg.reply({ embeds: [embed] });
    }

    let totalDice = 0;
    let hungerDice = 0;
    let difficulty = null;

    // Ajuste do parser para aceitar qualquer ordem
    for (let arg of args) {
      if (/^\d+$/.test(arg)) {
        totalDice = parseInt(arg);
      } else if (/^(f|f=)\d+$/i.test(arg)) {
        hungerDice = parseInt(arg.replace(/f=|f/i, ""));
      } else if (/^\d+f$/i.test(arg)) {
        hungerDice = parseInt(arg.replace(/f/i, ""));
      } else if (/^(d|dif|dif=)\d+$/i.test(arg)) {
        difficulty = parseInt(arg.replace(/d=|dif=|dif|d/i, ""));
      }
    }

    if (totalDice <= 0) {
      return msg.reply("❌ Você precisa informar a quantidade de dados. Ex: `%v 6` ou `%v 6 f2 d3`");
    }

    hungerDice = Math.min(hungerDice, totalDice);
    const normalDice = totalDice - hungerDice;

    const rollDice = () => Math.ceil(Math.random() * 10);
    const hungerResults = Array.from({ length: hungerDice }, rollDice);
    const normalResults = Array.from({ length: normalDice }, rollDice);
    const allResults = [...hungerResults, ...normalResults];

    const successes = allResults.filter(v => v >= 6).length;
    const tens = allResults.filter(v => v === 10).length;
    const normalTens = normalResults.filter(v => v === 10).length;
    const hungerTens = hungerResults.filter(v => v === 10).length;
    const hungerOnes = hungerResults.filter(v => v === 1).length;

    let result = "Sucesso Simples";
    let color = 0xcccccc;

    if (tens >= 2 && tens % 2 === 0) {
      if (hungerTens >= 2) {
        result = "💀 **Crítico Bagunçado!**";
        color = 0xff9900;
      } else {
        result = "✨ **Sucesso Crítico!**";
        color = 0x0099ff;
      }
    }

    if (difficulty) {
      if (successes >= difficulty) {
        const margem = successes - difficulty;
        result += `\n🎯 **Margem de Sucesso:** ${margem}`;
      } else {
        result = "❌ **Falha!**";
        color = 0xff0000;
      }
    }

    const embed = new EmbedBuilder()
      .setTitle(`🧛 Teste de Vampiro V5 — ${totalDice}d10${hungerDice ? ` (${hungerDice} de Fome)` : ""}`)
      .addFields(
        { name: "🎯 Sucessos", value: `${successes}`, inline: true },
        { name: "📌 Resultado", value: result, inline: true },
        {
          name: "🎲 Dados Normais",
          value: normalResults.length ? normalResults.map(v => dieEmoji(v)).join(" ") : "–",
        },
        {
          name: "🩸 Dados de Fome",
          value: hungerResults.length ? hungerResults.map(v => dieEmoji(v, true)).join(" ") : "–",
        },
      )
      .setColor(color)
      .setFooter({ text: `${author.username}`, iconURL: author.displayAvatarURL() });

    msg.reply({ embeds: [embed] });
  }
};
