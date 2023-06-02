export default class feira extends Phaser.Scene {
  constructor() {
    super("feira");

    this.escolha = undefined;
    this.jogos = [
      {
        indice: "maze-of-the-past",
        url: "https://ifsc.digital/Maze-of-the-past-/",
        logo: {
          nome: "logo-maze-of-the-past",
          arquivo: "./assets/logo-maze-of-the-past.png",
          x: 135,
          y: 250,
        },
        qrcode: {
          nome: "qrcode-maze-of-the-past",
          arquivo: "./assets/qrcode-maze-of-the-past.png",
        },
      },
      {
        indice: "triver",
        url: "https://ifsc.digital/Trivert/",
        logo: {
          nome: "logo-trivert",
          arquivo: "./assets/logo-trivert.png",
          x: 375,
          y: 250,
        },
        qrcode: {
          nome: "qrcode-trivert",
          arquivo: "./assets/qrcode-trivert.png",
        },
      },
      {
        indice: "escape-room",
        url: "https://ifsc.digital/EscapeRoom/",
        logo: {
          nome: "logo-escape-room",
          arquivo: "./assets/logo-escape-room.png",
          x: 400,
          y: 450,
        },
        qrcode: {
          nome: "qrcode-escape-room",
          arquivo: "./assets/qrcode-escape-room.png",
        },
      },
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

    this.load.audio("caixinha-de-musica", "./assets/caixinha-de-musica.mp3");
    this.load.audio("pop", "./assets/pop.mp3");
  }

  create() {
    this.cameras.main.fadeIn(1000);

    this.caixinha_de_musica = this.sound.add("caixinha-de-musica");
    this.pop = this.sound.add("pop");

    this.jogos.forEach((jogo) => {
      jogo.logo.objeto = this.add
        .image(jogo.logo.x, jogo.logo.y, jogo.logo.nome)
        .setInteractive()
        .on("pointerdown", () => {
          if (!this.escolha) {
            this.caixinha_de_musica.play();
            this.cameras.main.fadeOut(250);
            this.cameras.main.once("camerafadeoutcomplete", (camera) => {
              camera.fadeIn(250);

              this.escolha = jogo.url;
              this.fechar.setVisible(true);
              this.jogar.setVisible(true);

              this.jogos.forEach((jogo) => {
                jogo.logo.objeto.setVisible(false);
                jogo.qrcode.objeto.setVisible(false);
              });

              jogo.logo.objeto.setVisible(true);
              jogo.logo.objeto.x = this.game.config.width / 2;
              jogo.logo.objeto.y = this.game.config.height / 2 - 256;
              jogo.qrcode.objeto.setVisible(true);
            });
          }
        });

      jogo.qrcode.objeto = this.add
        .image(
          this.game.config.width / 2,
          this.game.config.height / 2 + 25,
          jogo.qrcode.nome
        )
        .setVisible(false);
    });

    this.fechar = this.add
      .image(this.game.config.width - 64, 64, "fechar")
      .setInteractive()
      .setVisible(false)
      .on("pointerdown", () => {
        if (this.caixinha_de_musica.isPlaying) {
          this.caixinha_de_musica.stop();
        }
        this.pop.play();
        this.cameras.main.fadeOut(250);
        this.cameras.main.once("camerafadeoutcomplete", (camera) => {
          camera.fadeIn(250);

          this.escolha = undefined;

          this.jogos.forEach((jogo) => {
            jogo.logo.objeto.setVisible(true);
            jogo.qrcode.objeto.setVisible(false);
            jogo.logo.objeto.x = jogo.logo.x;
            jogo.logo.objeto.y = jogo.logo.y;
          });

          this.fechar.setVisible(false);
          this.jogar.setVisible(false);
        });
      });

    this.anims.create({
      key: "jogar-animado",
      frames: this.anims.generateFrameNumbers("jogar", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.jogar = this.add
      .sprite(
        this.game.config.width / 2,
        this.game.config.height / 2 + 300,
        "jogar",
        0
      )
      .setInteractive()
      .setVisible(false)
      .anims.play("jogar-animado", true)
      .on("pointerdown", () => {
        window.open(this.escolha, "_blank");
      });
  }

  update() {}
}
