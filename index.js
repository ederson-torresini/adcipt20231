/* Configuração do jogo */
import config from "./config.js";

/* Cenas */
import registro from "./registro.js";
import presenca from "./presença.js";

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
    this.scene.add("registro", registro);
    this.scene.add("presença", presenca);
    this.scene.start("registro");
  }
}

window.onload = () => {
  window.game = new Game();
};
