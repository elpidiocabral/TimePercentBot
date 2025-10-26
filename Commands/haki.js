module.exports = {
  run: async (client, msg, args) => {
    const tipos = {
      geral: `🔷 **Haki — A Cor da Ambição**
Resumo rápido: Haki é uma manifestação da força espiritual (EE) baseada em Determinação.

- Para desbloquear: Nível 10 de classe (você ganha 1 Ponto de Ambição e acesso ao Haki da sua afinidade).
- EE máxima = seu % de Determinação (ex.: 75% Determinação = 75 EE).
- Subcomandos: \`energia\`, \`armamento\`, \`observacao\`, \`conquistador\`, \`pontos\`, \`treino\`.

Use: \`%haki <subcomando>\` — Ex.: \`%haki armamento\` para ver Armamento (Busoshoku).
`,

      energia: `🔋 **Energia Espiritual (EE)**

- Reserva: igual ao seu valor percentual de Determinação (ex.: 75% = 75 EE).
- Recuperação passiva: no início do seu turno em combate, recupera EE igual ao seu valor de *Vontade*.
- Conversão de Vigor: Ação Bônus — gastar 2 Vigor = recuperar 1 EE.
- Descansos: curtos/longos/completos recuperam EE por completo. Emergência: gastar 1 Vigor = 1 EE.

Dica: monitore EE para usar técnicas de Haki e evitar esgotar (algumas recompensas dão 1 Ponto de Ambição ao zerar EE).`,

      armamento: `🛡️ **Haki do Armamento (Busoshoku Haki)**

Função: endurecer corpo/armas para causar/absorver dano, ignorar intangibilidade de Logia e propriedades especiais.

Mecânicas principais:
- Endurecimento Ofensivo: aumenta acerto e escala de dano; custo em EE por nível.
- Endurecimento Defensivo: bônus de CA e vida extra temporária por EE.
- Imbuição: imbuir armas/objetos com Haki (mais caro que endurecer o corpo).
- Endurecimento de Corpo Inteiro (pré-req nível 3): Escudo massivo de PV temporários; reduz deslocamento e limita reações.
- Anulação de efeitos de fruta (nível 4+): gastar EE para refazer salvaguarda com vantagem.

Tabela resumida: cada nível de Ambição aumenta bônus e custos; níveis 1–5 trazem ganhos progressivos em acerto, dano e efeitos especiais.

Uso em habilidades: você pode manter um Foco (Endurecimento/Imbuição) para que habilidades compatíveis ganhem benefícios do Haki ou integrar Haki direto na habilidade (PH/treino).`,

      observacao: `👁️ **Haki da Observação (Kenbunshoku Haki)**

Função: sexto sentido — detectar presenças, intenções e prever movimentos.

Mecânicas principais:
- Premonição/Detecção de Intenção: concede vantagens/desvantagens escalando com nível de Ambição (1–5). Quando dois usuários se enfrentam, seus efeitos se cancelam parcialmente.
- Detecção de Presença (Scan): ação que detecta seres vivos em raio (20m × nível) e pode avaliar força relativa com custo extra em EE.
- Empatia/Detecção de Emoções: perceber emoções próximas; sondagem profunda exige teste de Intuição vs Vontade do alvo.

Notas: manter Foco pode consumir EE por turno; uso contínuo prolongado pode causar Exaustão (teste de Vontade).`,

      conquistador: `👑 **Haki do Conquistador (Haoshoku Haki)**

Raro e inato — impõe sua vontade sobre outros. Não pode ser escolhido; desperta em certos eventos ou concedido pelo Mestre.

Resumo de efeitos por controle (0–5):
- Nível 0: Explosão Inconsciente — libera toda a EE e pode causar inconsciência em alvos fracos.
- Nível 1: Intimidação Ativa & Onda de Nocaute (área).
- Níveis 2–3: Nocaute Direcionado, Presença Seletiva, Quebra de Foco.
- Níveis 4–5: Aura de Pressão, Postura Inquebrantável, Comando do Soberano (efeitos de área massivos e capacidades excepcionais).

Regras chaves: afeta alvos com Determinação menor que um percentual da sua; muitas técnicas têm custo em EE (dados por técnica).`,

      pontos: `📍 **Pontos de Ambição & Progressão**

- A partir do nível 10 de classe: ganha Pontos de Ambição ao subir de nível.
- Ganhos adicionais: 1 Ponto ao zerar sua EE em combate (1× por Descanso Longo); 1 Ponto ao ser derrotado por alguém com Haki superior; 1 Ponto ao derrotar/empatar contra Haki superior; treinos/PH.
- Custos: subir 1 nível em um Haki custa pontos iguais ao nível que você quer atingir; subir o Haki da sua afinidade custa 1 ponto a menos.

Uso: gaste Pontos de Ambição para comprar níveis de Ambição nos três tipos de Haki (Armamento, Observação, Conquistador).`,

      treino: `🏋️ **Treinamento e Mestres**

- Mestres podem treinar por períodos longos para ensinar até nível 2 de Ambição em um Haki.
- O restante deve ser alcançado com esforço, uso em combate e pontos de Ambição acumulados.

Sugestão de treino: combine desafios práticos (duelos, simulações) com descanso e trabalho de Vontade para acelerar o domínio.`
    };

    const tipo = args[0]?.toLowerCase();

    if (!tipo) {
      return msg.channel.send(tipos.geral);
    }

    if (tipos[tipo]) {
      return msg.channel.send(tipos[tipo]);
    }

    return msg.reply(`Subcomando inválido. Use: \`%haki\`, \`%haki energia\`, \`%haki armamento\`, \`%haki observacao\`, \`%haki conquistador\`, \`%haki pontos\`, \`%haki treino\`.`);
  }
};
