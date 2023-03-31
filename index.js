// Configuração do jogo
import config from "./config.js";
//
// Importar código das cenas
import abertura from "./abertura.js";
import principal from "./principal.js";
import fim_do_jogo from "./fim-do-jogo.js";
import final_feliz from "./final-feliz.js";

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
    this.scene.add("fim-do-jogo", fim_do_jogo);
    this.scene.add("final-feliz", final_feliz);
    //
    // Iniciar pela cena de abertura
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
