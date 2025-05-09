const fs = require('fs');
const path = require('path');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
  run: async (client, msg, args) => {
    if (!args.length) return msg.reply("Você precisa informar um termo para buscar.");

    const termo = args.join(" ").toLowerCase();
    const filePath = path.join(__dirname, "../Sistema-OP.txt");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return msg.reply("Erro ao ler o sistema.");

      const linhas = data.split('\n');
      const resultados = [];
      const maxResultados = 5;

      for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i];
        const linhaTrim = linha.trimStart().toLowerCase();

        if (linhaTrim.includes(termo)) {
          const ehTitulo = /^#{2,4}( |\s?\*\*)/.test(linha.trimStart());

          if (ehTitulo) {
            const bloco = [linha];
            for (let j = i + 1; j < linhas.length; j++) {
              const prox = linhas[j];
              if (/^#{2,4}( |\s?\*\*)/.test(prox.trimStart())) break;
              bloco.push(prox);
            }
            resultados.push(bloco.join('\n').trim());
          } else {
            resultados.push(linha.trim());
          }
        }

        if (resultados.length >= maxResultados) break;
      }

      if (resultados.length === 0) {
        msg.reply(`Nenhum resultado encontrado para: \`${termo}\`.`);
      } else {
        const resposta = resultados
          .map((r, i) => `\`${i + 1}.\` ${r}`)
          .join('\n---\n');

        if (resposta.length > 2000) {
          const buffer = Buffer.from(resposta, 'utf-8');
          const attachment = new AttachmentBuilder(buffer, { name: `busca-${termo}.txt` });
          msg.reply({ content: `Resultado da busca por: **${termo}** (em anexo)`, files: [attachment] });
        } else {
          msg.channel.send(`🔍 Resultados para **"${termo}"**:\n${resposta}`);
        }
      }
    });
  }
}
