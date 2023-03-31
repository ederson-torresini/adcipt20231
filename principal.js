export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    this.load.spritesheet("robo-1", "./assets/robo-1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("robo-2", "./assets/robo-2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.jogador_1 = this.physics.add
      .sprite(200, 225, "robo-1")
      .setInteractive()
      .on("pointerdown", () => {
        this.jogador_1.destroy();
        this.jogador_2.destroy();
        this.game.scene.start("fim-do-jogo");
      });
    this.anims.create({
      key: "jogador-1-direita",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 0,
        end: 15,
      }),
      frameRate: 30,
      repeat: -1,
    });
    this.jogador_1.anims.play("jogador-1-direita", true);

    this.jogador_2 = this.physics.add
      .sprite(600, 225, "robo-2")
      .setInteractive()
      .on("pointerdown", () => {
        this.jogador_1.destroy();
        this.jogador_2.destroy();
        this.game.scene.start("final-feliz");
      });
    this.anims.create({
      key: "jogador-2-direita",
      frames: this.anims.generateFrameNumbers("robo-2", {
        start: 32,
        end: 47,
      }),
      frameRate: 30,
      repeat: -1,
    });
    this.jogador_2.anims.play("jogador-2-direita", true);
  }

  update() {}
}
