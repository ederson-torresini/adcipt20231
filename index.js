import config from "./config.js";
import CenaDeAbertura from "./cena.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.socket = io();
    this.socket.on("connect", () => {
      this.socket.emit("entrar-na-sala", this.socket.id);
    });

    this.scene.add("abertura", CenaDeAbertura);
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
