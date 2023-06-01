import config from "./config.js";
import feira from "./feira.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("feira", feira);
    this.scene.start("feira");
  }
}

window.onload = () => {
  window.game = new Game();
};
