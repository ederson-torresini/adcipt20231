/* Configuração do jogo */
import config from "./config.js";

/* Cenas */
import abertura from "./abertura.js";
import principal from "./principal.js";
import encerramento from "./encerramento.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    /* Sinalização, escolha de caminho e mídia */
    this.socket = io();

    this.socket.on("connect", () => {
      this.socket.emit("registro", this.socket.id);
    });

    this.socket.on("registro-ok", () => {
      this.registro = true;
    });

    this.socket.on("registro-nok", () => {
      this.registro = false;
    });

    this.ice_servers = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
    this.audio = document.querySelector("audio");
    this.midias = undefined;

    /* Cenas */
    this.scene.add("abertura", abertura);
    this.scene.add("principal", principal);
    this.scene.add("encerramento", encerramento);
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
