module.exports = {
  run: async (client, msg, args) => {
    const imagensBoaNoite = [
      "https://i.pinimg.com/474x/d5/e6/06/d5e606a4159d581680c82ed8d2268c0c.jpg",
      "https://i.pinimg.com/564x/a3/f4/20/a3f42031dadacf3c0d9befd77fc93618.jpg",
      "https://cdn.pensador.com/img/imagens/qu/es/que_sua_noite_seja_iluminada_pelos_mais_lindos_sonhos_boa_noite_c.jpg?auto_optimize=low&width=655",
      "https://i.pinimg.com/736x/89/5e/07/895e07119f179b53021bd2dd4d4a698c.jpg",
      "https://i.pinimg.com/564x/ea/4d/b3/ea4db3fabed2befae629a9c396a86558.jpg",
      "https://i.pinimg.com/736x/bd/00/19/bd0019e4996e831143a36077e653ac6e.jpg",
      "https://i.pinimg.com/736x/3d/cf/c1/3dcfc17c83bd1ab6656213efada76872.jpg",
      "https://i.pinimg.com/736x/70/b6/1f/70b61fc220e735ce8a181304db3b591f.jpg",
      "https://i.pinimg.com/736x/b6/65/d8/b665d8ef5532a200aa0f42a5ed044294.jpg",
      "https://i.pinimg.com/736x/13/f5/55/13f5553f69ce4c5cd26d90b26aeccd84.jpg",
      "https://i.pinimg.com/736x/14/f6/2a/14f62a06545c01daa72cc4c3a6be5b79.jpg",
      "https://i.pinimg.com/736x/5d/c8/9a/5dc89aa090fa99af7c4b876881ad3d25.jpg",
      "https://i.pinimg.com/originals/ec/46/51/ec4651bf61a2bb3dabdaa598f5d86f54.gif",
      "https://i.pinimg.com/736x/c2/09/7c/c2097c5da60eecca1d0f8cb6bc7336fb.jpg"
    ];

    const imagem = imagensBoaNoite[Math.floor(Math.random() * imagensBoaNoite.length)];

    msg.channel.send({
      content: `🌙 Boa noite, ${msg.author.username}!`,
      embeds: [
        {
          image: { url: imagem }
        }
      ]
    });
  }
}
