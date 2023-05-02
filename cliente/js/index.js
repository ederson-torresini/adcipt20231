import config from "./config.js";
import abertura from "./cena-abertura.js";
import principal from "./cena-principal.js";
import fim_do_jogo from "./cena-fim-do-jogo.js";
import final_feliz from "./cena-final-feliz.js";

class Game extends Phaser.Game {
  constructor() {
    /* Configuração */
    super(config);

    /* Estalecimento de canal bidirecional para troca de mensagens */
    this.socket = io();
    this.socket.on("connect", () => {
      console.log("Conectado ao servidor para troca de mensagens.")
    });

    /* Cenas */
    this.scene.add("abertura", abertura);
    this.scene.add("principal", principal);
    this.scene.add("fim-do-jogo", fim_do_jogo);
    this.scene.add("final-feliz", final_feliz);

    /* Primeira cena a carregar */
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
