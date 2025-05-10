const { EmbedBuilder } = require('discord.js');

module.exports = {
  run: async (client, msg, args) => {
    const embed = new EmbedBuilder()
      .setTitle("📘 Comandos Disponíveis – A Vontade dos Mares")
      .setColor(0x0099ff)
      .addFields(
        {
          name: "🔍 Consulta",
          value: "`%buscar`, `%reação`",
        },
        {
          name: "⚔️ Combate",
          value: "`%clash`, `%clash <tipo>`, `%clash <tipo> @alvo`",
        },
        {
          name: "🎲 Sistema",
          value: "`%ajuda`",
        },
        {
          name: "🎭 Narrativo",
          value: "",
        }
      )
      .setFooter({ text: "Sistema A Vontade dos Mares – Inspirado em One Piece" });

    msg.channel.send({ embeds: [embed] });
  }
};
