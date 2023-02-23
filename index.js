import config from "./config.js";
import CenaDeAbertura from "./cena.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = {};
    this.scene.add("abertura", CenaDeAbertura);
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
