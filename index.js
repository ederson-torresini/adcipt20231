import CenaDeAbertura from "./cena.js";
import abertura from "./cena.js";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [CenaDeAbertura],
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
