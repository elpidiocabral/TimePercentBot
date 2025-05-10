module.exports = {
  run: async (client, msg, args) => {
    const tipo = (args[0] || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const reações = {
      desvio: `🌀 **Reação: Desvio**
*Custo:* 1d4 de Vigor por nível de classe  
Você se concentra em desviar dos golpes que o têm como alvo.

- Sua **Agilidade é multiplicada por 1.5** até o início do próximo turno.
- Isso pode **aumentar sua Classe de Acerto (CA)**, pois ela usa o maior valor entre Agilidade ou Resistência.
- Você também recebe todos os benefícios da **Agilidade**.
- Só pode ser usada **uma vez por rodada**.`,

      defesa: `🛡️ **Reação: Defesa**
*Custo:* 1d4 de Vigor por nível de classe  
Você se protege ativamente, ocultando pontos vitais.

- Sua **Resistência é multiplicada por 1.5** até o início do próximo turno.
- Você ganha **vida extra** igual à metade da sua Resistência base.
- Isso pode **aumentar sua Classe de Acerto (CA)**, já que a CA usa o maior entre Agilidade e Resistência.
- Só pode ser usada **uma vez por rodada**.`,

      "contra-ataque": `⚔️ **Reação: Contra-Ataque**
Você gasta o **maior dado de dano da sua arma** em Vigor e realiza uma **jogada de ataque** contra o inimigo atacante.

- Não oferece defesa ou aumento de CA.
- É uma resposta ofensiva imediata e ousada.`,
    };

    if (!tipo) {
      return msg.channel.send(`
🎯 **Reações no Sistema – A Vontade dos Mares**

Durante uma rodada, ao ser alvo de um ataque, técnica ou salvaguarda, você pode usar **uma reação**.
- Você **recupera suas reações** no início do seu turno.
- Pode usar **1 ou mais vez por rodada** cada tipo de reação.
- Ganha **+1 reação extra a cada 10 pontos de Agilidade.**

🧠 Reações disponíveis:
- \`Desvio\` → Foca em esquiva com Agilidade, podendo aumentar sua **CA** e ganhar ações extras.
- \`Defesa\` → Foca em resistência e PV extra., podendo também aumentar sua **CA**.
- \`Contra-Ataque\` → Não aumenta CA, mas devolve o golpe imediatamente.

Digite:
\`%reação desvio\`
\`%reação defesa\`
\`%reação contra-ataque\`
para ver detalhes individuais.
      `);
    }

    if (reações[tipo]) {
      return msg.channel.send(reações[tipo]);
    }

    return msg.reply(`Reação desconhecida. Use: \`desvio\`, \`defesa\`, ou \`contra-ataque\`.`);
  }
}
