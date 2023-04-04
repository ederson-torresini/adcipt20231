export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    this.load.image("ifsc-sj-2014", "./assets/ifsc-sj-2014.png");
  }

  create() {
    /* Imagem de fundo */
    this.imagem = this.add
      .image(400, 225, "ifsc-sj-2014")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.texto.destroy();
        this.game.scene.start("principal");
      });

    /* Texto em destaque */
    this.texto = this.add.text(490, 50, "Clique no prédio para entrar...", {
      fill: "#000000",
    });
  }

  upload() {}
}
