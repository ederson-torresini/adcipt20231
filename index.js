import config from "./config.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}

window.onload = () => {
  window.game = new Game();
};
