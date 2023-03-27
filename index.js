// Configuração do jogo
import config from "./config.js";
//
// Importar código das cenas
import abertura from "./abertura.js";
import principal from "./principal.js";
import encerramento from "./encerramento.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    //
    // Carregar as cenas
    this.scene.add("abertura", abertura);
    this.scene.add("principal", principal);
    this.scene.add("encerramento", encerramento);
    //
    // Iniciar pela cena de abertura
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
