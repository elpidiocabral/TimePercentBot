const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'r',
  description: 'Rola dados no formato XdY+Z, N#XdY+Z, X%, dX%',

  run: async (client, message, args) => {
    if (!args.length)
      return message.channel.send('Forneça a rolagem. Ex: `1d20+3`, `?1d20+5`, `3#1d6+2`, `90%`, `d90%`, `1d6+1d4+3`.');

    let input = args.join('').toLowerCase().trim();
    let oculto = false;

    if (input.startsWith('?')) {
      oculto = true;
      input = input.slice(1);
    }

    const rollDice = (qtd, faces) =>
      Array.from({ length: qtd }, () => Math.floor(Math.random() * faces) + 1);

    const formatRolls = (arr, faces) =>
      arr.map(r => (r === 1 || r === faces) ? `**\`${r}\`**` : `\`${r}\``).join(', ');

    let times = 1;
    let rollPart = input;

    const multiMatch = input.match(/^(\d+)#(.+)/);
    if (multiMatch) {
      times = parseInt(multiMatch[1]);
      rollPart = multiMatch[2];
    }

    // 🎯 Determinação simples (%r 90%)
    const detSimpleMatch = rollPart.match(/^(\d+)%$/);
    if (detSimpleMatch) {
      const mod = parseInt(detSimpleMatch[1]);
      const roll = rollDice(1, 100)[0];
      const total = roll + mod;

      const embed = new EmbedBuilder()
        .setColor(0x007bff)
        .setTitle(`🎯 Resultado: **${total}**`)
        .addFields({ name: 'Rolagem', value: `1d100 (${roll}) + ${mod}` })
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    // 🧠 Teste de resistência de Determinação (%r d90%)
    const detResistMatch = rollPart.match(/^d(\d+)%$/);
    if (detResistMatch) {
      const determinacao = parseInt(detResistMatch[1]);
      const dificuldade = 20 - Math.floor(Math.abs(determinacao / 5));
      const roll = rollDice(1, 20)[0];
      const sucesso = roll >= dificuldade;

      const embed = new EmbedBuilder()
        .setColor(sucesso ? 0x007bff : 0xff0000)
        .setTitle(`${sucesso ? '✅ Sucesso' : '❌ Falha'} no Teste de Determinação!`)
        .addFields(
          { name: 'Dificuldade', value: `${dificuldade}`, inline: true },
          { name: 'Rolagem', value: `d20 (${roll})`, inline: true }
        )
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    // 🎲 Rolagens compostas
    const dicePattern = /^([+-]?\d*d\d+|[+-]?\d+)([+-]\d*d\d+|[+-]\d+)*$/;
    if (!dicePattern.test(rollPart))
      return message.channel.send('Formato inválido. Use: `XdY+Z`, `N#XdY+Z`, `%r X%` ou `%r dX%`, ou rolagens como `1d6+2d4+5`.');

    const embeds = [];

    for (let i = 0; i < times; i++) {
      let total = 0;
      let components = [];
      let critColor = 0x007bff;
      let hasCrit = false;

      const parts = rollPart.match(/([+-]?[^+-]+)/g);

      for (let part of parts) {
        let sign = 1;
        if (part.startsWith('-')) {
          sign = -1;
          part = part.slice(1);
        } else if (part.startsWith('+')) {
          part = part.slice(1);
        }

        if (part.includes('d')) {
          let [q, f] = part.split('d');
          const qtd = parseInt(q) || 1;
          const faces = parseInt(f);
          const rolls = rollDice(qtd, faces);
          const sum = rolls.reduce((a, b) => a + b, 0);
          total += sign * sum;

          if (qtd === 1 && (rolls[0] === 1 || rolls[0] === faces)) {
            hasCrit = true;
            critColor = rolls[0] === 1 ? 0xff0000 : 0x00ff00;
          }

          components.push(`${sign < 0 ? '-' : ''}${qtd}d${faces} (${formatRolls(rolls, faces)})`);
        } else {
          const num = parseInt(part);
          total += sign * num;
          components.push(`${sign < 0 ? '-' : '+'}${Math.abs(num)}`);
        }
      }

      const embed = new EmbedBuilder()
        .setColor(hasCrit ? critColor : 0x007bff)
        .setTitle(`🎲 Resultado: **${total}**`)
        .addFields({ name: 'Rolagem', value: components.join(' ') })
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setTimestamp();

      embeds.push(embed);
    }

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
