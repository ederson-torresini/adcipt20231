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
        },
        qrcode: {
          nome: "qrcode-escape-room",
          arquivo: "./assets/qrcode-escape-room.png",
        },
      },
      {
        indice: "joao-maria",
        url: "https://ifsc.digital/Joao-Maria-The-order-of-warder/",
        logo: {
          nome: "logo-joao-maria",
          arquivo: "./assets/logo-joao-maria.png",
        },
        qrcode: {
          nome: "qrcode-joao-maria",
          arquivo: "./assets/qrcode-joao-maria.png",
        },
      },
    ];
  }

  preload() {
    this.jogos.forEach((jogo) => {
      this.load.image(jogo.logo.nome, jogo.logo.arquivo);
      this.load.image(jogo.qrcode.nome, jogo.qrcode.arquivo);
    });
    this.load.image("fechar", "./assets/fechar.png");
    this.load.spritesheet("jogar", "./assets/jogar.png", {
      frameWidth: 402,
      frameHeight: 65,
    });
    this.load.spritesheet("parque", "./assets/parque.png", {
      frameWidth: 960,
      frameHeight: 540,
    });
    this.load.spritesheet("botao-casa", "./assets/botao-casa.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.audio("trilha", "./assets/trilha.mp3");
  }

  create() {
    this.fadingTime = 250;
    this.speed = 300;
    this.cameras.main.fadeIn(this.fadingTime * 4);

    this.trilha = this.sound.add("trilha");
    this.trilha.loop = true;
    this.trilha.play();

    this.jogos.forEach((jogo) => {
      jogo.logo.objeto = this.physics.add
        .sprite(
          this.game.config.width / 2,
          this.game.config.height / 2,
          jogo.logo.nome
        )
        .setVelocityX((Math.random() - 0.5) * Math.random() * this.speed)
        .setVelocityY((Math.random() - 0.5) * Math.random() * this.speed)
        .setCollideWorldBounds(true, 1, 1, true)
        .setInteractive()
        .on("pointerdown", () => {
          if (!this.escolha) {
            this.cameras.main.fadeOut(this.fadingTime);
            this.cameras.main.once("camerafadeoutcomplete", (camera) => {
              camera.fadeIn(this.fadingTime);

              this.escolha = jogo.url;
              this.fechar.setVisible(true);
              this.jogar.setVisible(true);

              this.jogos.forEach((jogo) => {
                jogo.logo.objeto.setVisible(false);
                jogo.qrcode.objeto.setVisible(false);
              });

              jogo.logo.objeto.setVisible(true);
              jogo.logo.objeto.setTint("0x333333");
              jogo.qrcode.objeto.setVisible(true);
            });
          }
        });

      jogo.qrcode.objeto = this.add
        .image(
          this.game.config.width / 2,
          this.game.config.height / 2,
          jogo.qrcode.nome
        )
        .setVisible(false);
    });

    this.fechar = this.add
      .image(this.game.config.width - 64, 64, "fechar")
      .setInteractive()
      .setVisible(false)
      .on("pointerdown", () => {
        this.cameras.main.fadeOut(this.fadingTime);
        this.cameras.main.once("camerafadeoutcomplete", (camera) => {
          camera.fadeIn(this.fadingTime);

          this.escolha = undefined;

          this.jogos.forEach((jogo) => {
            jogo.logo.objeto.setVisible(true);
            jogo.qrcode.objeto.setVisible(false);
            jogo.logo.objeto.setTint("0xffffff");
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
        this.game.config.height / 2 + 200,
        "jogar",
        0
      )
      .setInteractive()
      .setVisible(false)
      .anims.play("jogar-animado", true)
      .on("pointerdown", () => {
        window.open(this.escolha, "_blank");
      });

    this.anims.create({
      key: "parque-animado",
      frames: this.anims.generateFrameNumbers("parque", {
        start: 0,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.parque = this.add.sprite(480, 270, "parque").play("parque-animado");

    this.anims.create({
      key: "botao-casa",
      frames: this.anims.generateFrameNumbers("botao-casa", {
        start: 0,
        end: 5,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.botao_casa = this.add
      .sprite(this.game.config.width * 0.5, this.game.config.height * 0.8, "botao-casa")
      .play("botao-casa")
      .setInteractive()
      .on("pointerdown", () => {
        this.cameras.main.fadeOut(250);
        this.cameras.main.once("camerafadeoutcomplete", (camera) => {
          this.botao_casa.destroy();
          this.parque.destroy();
          camera.fadeIn(250);
        });
      });
  }
}
