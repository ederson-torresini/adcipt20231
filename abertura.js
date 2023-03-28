export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {}

  create() {
    this.avançar = this.add
      .text(50, 200, "[Clique para avançar]", {
        fill: "#FFFFFF",
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.avançar.destroy();
        this.game.scene.start("principal");
      });
  }

  upload() {}
}
