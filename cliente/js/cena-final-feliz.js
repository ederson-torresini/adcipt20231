export default class final_feliz extends Phaser.Scene {
  constructor() {
    super("final-feliz");
  }

  preload() {
    this.load.image("ifsc-sj-2014", "./assets/ifsc-sj-2014.png");
  }

  create() {
    /* Imagem de fundo */
    this.imagem = this.add
      .image(400, 225, "ifsc-sj-2014")
      .setTint(0xffff00)
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.texto.destroy();
        this.game.scene.start("abertura");
      });

    /* Texto em destaque */
    this.texto = this.add.text(490, 50, "Final feliz!", {
      fill: "#000000",
    });
  }

  update() { }
}
