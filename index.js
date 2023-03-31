import config from "./config.js";

import abertura from "./abertura.js";
import principal from "./principal.js";
import fim_do_jogo from "./fim-do-jogo.js";
import final_feliz from "./final-feliz.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("abertura", abertura);
    this.scene.add("principal", principal);
    this.scene.add("fim-do-jogo", fim_do_jogo);
    this.scene.add("final-feliz", final_feliz);

    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
