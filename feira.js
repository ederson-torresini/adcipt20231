export default class feira extends Phaser.Scene {
  constructor() {
    super("feira");

    this.jogos = [
      {
        //   indice: "gravity-falls-game",
        //   url: "https://gravityfallsgame.ifsc.cloud/",
        //   logo: {
        //     nome: "logo-gravity-falls-game",
        //     arquivo: "./assets/logo/gravity-falls-game.png",
        //     x: 135,
        //     y: 250,
        //   },
        //   qrcode: {
        //     nome: "qrcode-gravity-falls-game",
        //     arquivo: "./assets/qrcode/gravity-falls-game.png",
        //   },
      },
      // {
      //   indice: "killer-run",
      //   url: "https://killerrun.ifsc.cloud/",
      //   logo: {
      //     nome: "logo-killer-run",
      //     arquivo: "./assets/logo/killer-run.png",
      //     x: 405,
      //     y: 250,
      //   },
      //   qrcode: {
      //     nome: "qrcode-killer-run",
      //     arquivo: "./assets/qrcode/killer-run.png",
      //   },
      // },
      // {
      //   indice: "princesa-perdidas",
      //   url: "https://princesasperdidas.ifsc.cloud/",
      //   logo: {
      //     nome: "logo-princesas-perdidas",
      //     arquivo: "./assets/logo/princesas-perdidas.png",
      //     x: 135,
      //     y: 450,
      //   },
      //   qrcode: {
      //     nome: "qrcode-princesas-perdidas",
      //     arquivo: "./assets/qrcode/princesas-perdidas.png",
      //   },
      // },
      // {
      //   indice: "soccer-simulator",
      //   url: "https://soccersimulator.ifsc.cloud/",
      //   logo: {
      //     nome: "logo-soccer-simulator",
      //     arquivo: "./assets/logo/soccer-simulator.png",
      //     x: 405,
      //     y: 450,
      //   },
      //   qrcode: {
      //     nome: "qrcode-soccer-simulator",
      //     arquivo: "./assets/qrcode/soccer-simulator.png",
      //   },
      // },
      // {
      //   indice: "mage-knight",
      //   url: "https://mageknight.ifsc.cloud/",
      //   logo: {
      //     nome: "logo-mage-knight",
      //     arquivo: "./assets/logo/mage-knight.png",
      //     x: 135,
      //     y: 750,
      //   },
      //   qrcode: {
      //     nome: "qrcode-mage-knight",
      //     arquivo: "./assets/qrcode/mage-knight.png",
      //   },
      // },
    ];
  }

  preload() {
    this.jogos.forEach((jogo) => {
      this.load.image(jogo.logo.nome, jogo.logo.arquivo);
      this.load.image(jogo.qrcode.nome, jogo.qrcode.arquivo);
    });

    this.load.spritesheet("jogar", "./assets/jogar.png", {
      frameWidth: 402,
      frameHeight: 65,
    });

    this.load.image("fechar", "./assets/fechar.png");
  }

  create() {}

  update() {}
}

// function create() {
//   escolha = undefined;

// this.anims.create({
//   key: "jogar-animado",
//   frames: this.anims.generateFrameNumbers("jogar", {
//     start: 0,
//     end: 6,
//   }),
//   frameRate: 10,
//   repeat: -1,
// });

//   jogar = this.add
//     .sprite(config.width / 2, config.height / 2 + 300, "jogar", 0)
//     .setInteractive()
//     .setVisible(false);
//   jogar.anims.play("jogar-animado", true);

//   jogar.on("pointerdown", () => {
//     window.open(escolha, "_blank");
//   });

//   fechar = this.add
//     .image(config.width - 64, 64, "fechar")
//     .setInteractive()
//     .setVisible(false);

//   fechar.on("pointerdown", () => {
//     escolha = undefined;

//     jogos.forEach((jogo) => {
//       jogo.logo.objeto.setVisible(true);
//       jogo.qrcode.objeto.setVisible(false);
//       jogo.logo.objeto.x = jogo.logo.x;
//       jogo.logo.objeto.y = jogo.logo.y;
//     });

//     fechar.setVisible(false);
//     jogar.setVisible(false);
//   });

//   jogos.forEach((jogo) => {
//     jogo.logo.objeto = this.add
//       .image(jogo.logo.x, jogo.logo.y, jogo.logo.nome)
//       .setInteractive();

//     jogo.qrcode.objeto = this.add
//       .image(config.width / 2, config.height / 2 + 25, jogo.qrcode.nome)
//       .setVisible(false);

//     jogo.logo.objeto.on("pointerdown", () => {
//       if (!escolha) {
//         escolha = jogo.url;
//         fechar.setVisible(true);
//         jogar.setVisible(true);

//         jogos.forEach((jogo) => {
//           jogo.logo.objeto.setVisible(false);
//           jogo.qrcode.objeto.setVisible(false);
//         });

//         jogo.logo.objeto.setVisible(true);
//         jogo.logo.objeto.x = config.width / 2;
//         jogo.logo.objeto.y = config.height / 2 - 256;
//         jogo.qrcode.objeto.setVisible(true);
//       }
//     });
//   });
// }

// function update() {}
