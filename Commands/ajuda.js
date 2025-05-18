const { EmbedBuilder } = require('discord.js');

module.exports = {
  run: async (client, msg, args) => {
    const embed = new EmbedBuilder()
      .setTitle("📘 Comandos Disponíveis – A Vontade dos Mares")
      .setColor(0x0099ff)
      .addFields(
        {
          name: "🔍 Consulta",
          value: "`%buscar`, `%reação`, `%trunfo`",
        },
        {
          name: "⚔️ Combate",
          value: "`%clash`, `%clash <tipo>`, `%clash <tipo> @alvo`",
        },
        {
          name: "🎲 Rolagem de Dados",
          value:
            "`%r XdY+Z` – Rola X dados de Y lados com modificador Z\n" +
            "`%r A#XdY+Z` – Rola A vezes a expressão XdY+Z\n" +
            "`%r ?XdY+Z` – Rola ocultamente (responde por DM)\n" +
            "`%r 1d6+2d4+5` – Rola dados compostos\n" +
            "`%r X%` – Teste simples de Determinação (1d100 + X)\n" +
            "`%r dX%` – Teste de Resistência de Determinação (CD = 20 - X/5)",
        },
        {
          name: "🎭 Narrativo",
          value: "*Em desenvolvimento*",
        }
      )
      .setFooter({ text: "Sistema A Vontade dos Mares – One Piece RPG" });

    msg.channel.send({ embeds: [embed] });
  }
};
