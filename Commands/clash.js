module.exports = {
  run: async (client, msg, args) => {
    const tipos = {
      inicial: `🎬 **Clash Inicial**
Esse Clash acontece logo após a rolagem de iniciativa.
- Ambos escolhem uma habilidade e colidem com Determinação.
- O vencedor se torna o primeiro na iniciativa e tem vantagem no 1º turno.
- Se a habilidade causar dano, causa dano mínimo.
- Em empate, vence quem tiver maior Agilidade.`,

      intermediario: `⏱️ **Clash Intermediário**
Após a 1ª rodada ou após perder um Clash inicial.
- Ambos escolhem habilidades **não focadas em dano** e executam com Determinação + ataque básico.
- O vencedor joga um **turno extra isolado** logo após.
- Não consome reações nem efeitos temporários.
- Empate: ambas habilidades funcionam.
- Se não tiver habilidade válida, faz apenas ataque básico.`,

      final: `💥 **Clash Final**
Usado quando ambos os lados estão no limite do combate.
- Ambos usam habilidades de **dano** e colidem com Determinação.
- Vencedor causa **dano máximo** ao perdedor.
- Empate: ambos levam dano máximo.
- Se alguém cair a 0 de vida, **não faz teste para ficar de pé**.`,

      "counter-clash": `🛡️ **Counter-Clash**
Se for desafiado para um Clash, você pode **negar o desafio**.
- Gasta um uso de Clash por combate para isso.
- Anula o Clash, mas ambos ainda gastam o **mínimo de vigor**.
- Essa ação é chamada de *Counter-Clash*.`,
    };

    const tipo = args[0]?.toLowerCase();
    const desafiado = msg.mentions.users.first();

    // Nenhum argumento → resumo geral
    if (!tipo) {
      return msg.channel.send(`
⚔️ **Clash – Mecânica de Conflito de Vontade**
Durante o combate, qualquer jogador pode desafiar outro para um **Clash**, colidindo habilidades através de testes resistidos de **Determinação**.

- Pode interromper a iniciativa.
- Ambos escolhem habilidades e pagam o custo mínimo de Vigor.
- O vencedor ativa o efeito da habilidade usada.
- Pode ser usado um número de vezes igual ao bônus de maestria por combate.
- Empate se diferença ≤ 10 nos testes.

📘 Existem 4 tipos principais:
- \`inicial\`, \`intermediario\`, \`final\`, \`counter-clash\`

Para mais detalhes, consulte o **livro do sistema** ou digite:
\`%clash inicial\`
\`%clash final\`
\`%clash intermediario\`
\`%clash counter-clash\`
      `);
    }

    // Argumento de tipo válido
    if (tipos[tipo]) {
      if (desafiado) {
        return msg.channel.send(`⚔️ **${msg.author.username} desafiou ${desafiado.username} para um Clash do tipo _${tipo}_!**
Preparem-se! Escolham suas habilidades e executem o Clash conforme as regras específicas descritas abaixo:\n\n${tipos[tipo]}`);
      }

      return msg.channel.send(`${tipos[tipo]}`);
    }

    // Tipo inválido
    return msg.reply(`Tipo de Clash inválido. Tipos válidos são: \`inicial\`, \`intermediario\`, \`final\`, \`counter-clash\`.`);
  }
}