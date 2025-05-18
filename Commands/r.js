const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'r',  // Nome do comando
  description: 'Comando para rolar dados no formato XdY+Z',

  run: async (client, message, args) => {
    if (!args.length) 
      return message.channel.send('Forneça a rolagem. Ex: `1d20+3`, `?1d20+5`, `3#1d6+2`');

    let input = args.join('').toLowerCase().trim();
    let oculto = false;

    if (input.startsWith('?')) {
      oculto = true;
      input = input.slice(1); // Remove o '?' para tratar como rolagem normal
    }

    // Função para rolar os dados
    const rollDice = (qtd, faces) => 
      Array.from({ length: qtd }, () => Math.floor(Math.random() * faces) + 1);

    // Formatar os resultados para exibição, destacando críticos e erros críticos
    const formatRolls = (arr, faces) => 
      arr.map(r => {
        if (r === 1 || r === faces) {
          // Se for crítico (menor ou maior valor), coloca em negrito
          return `**\`${r}\`**`;
        }
        return `\`${r}\``;
      }).join(', ');

    let times = 1; // Padrão de uma rolagem
    let rollPart = input;

    // Verificar se foi passado um número de repetições
    const multiMatch = input.match(/^(\d+)#(.+)/);
    if (multiMatch) {
      times = parseInt(multiMatch[1]);
      rollPart = multiMatch[2];
    }

    // Regex para capturar a rolagem XdY+Z
    const regex = /^(\d*)d(\d+)([+-]\d+)?$/;
    const match = rollPart.match(regex);

    if (!match) {
      return message.channel.send('Formato inválido. Use: `XdY+Z`, `N#XdY+Z` ou `?XdY+Z` para rolagem oculta.');
    }

    let [_, qtd, faces, mod] = match;
    qtd = parseInt(qtd) || 1; // Se não passar qtd, define como 1
    faces = parseInt(faces); // O número de faces do dado
    const modifier = mod ? parseInt(mod) : 0; // Modificador (+ ou -)

    if (qtd > 100 || faces > 1000 || times > 100) {
      return message.channel.send('Excesso de dados, faces ou repetições. Use valores mais baixos.');
    }

    const embeds = [];

    for (let i = 0; i < times; i++) {
      const rolls = rollDice(qtd, faces);
      const total = rolls.reduce((a, b) => a + b, 0) + modifier;

      // Formatar a rolagem com o dado e o modificador
      const rollText = `${qtd}d${faces} (${formatRolls(rolls, faces)})${modifier !== 0 ? ` ${modifier >= 0 ? `+${modifier}` : modifier}` : ''}`;

      // Criação do embed com os resultados
      const embed = new EmbedBuilder()
        .setColor(0x5865f2)
        .setTitle(`🎲 Resultado: ${total}`)  // Exibe o resultado final da rolagem
        .addFields(
          { name: 'Rolagem', value: rollText, inline: true }  // Exibe a fórmula com dados rolados e modificador, se houver
        )
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setTimestamp();

      embeds.push(embed);
    }

    // Envia o resultado dependendo se é oculto ou não
    if (oculto) {
      message.react('✅');
      message.author.send({ embeds }).catch(() => {
        message.channel.send('Não consegui enviar a rolagem por DM. Verifique suas configurações de privacidade.');
      });
    } else {
      message.channel.send({ embeds });
    }
  }
};
