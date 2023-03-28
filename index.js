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
    // Objetos globais
    this.navigator = window.navigator;
    try {
      this.socket = io();
      this.socket.on("connect", () => {
        this.socket.emit("entrar-na-sala", this.socket.id);
      });
    } catch (err) {
      console.log(err);
    }
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
