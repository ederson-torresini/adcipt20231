export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }
  
  preload() {}

  create() {
    //
    // Testar Geolocation API
    this.txtCoords = this.add.text(50, 100, "", { fill: "#FFFFFF" });
    this.game.navigator.geolocation.watchPosition(
      (pos) => {
        var coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        this.txtCoords.setText(
          `Latitude: ${coords.latitude}\nLongitude: ${coords.longitude}`
        );
        if (this.game.socket) {
          this.game.socket.emit("geolocation-api", coords);
        }
      },
      (err) => {
        console.error(`Erro (${err.code}): ${err.message}`);
      }
    );
    //
    // Testar Vibration API
    this.add
      .text(50, 200, "[pointerover + this.game.navigator]", { fill: "#FFFFFF" })
      .setInteractive()
      .on("pointerover", () => {
        this.cameras.main.shake(1000);
        this.game.navigator.vibrate([1000]);
        if (this.game.socket) {
          this.game.socket.emit("vibration-api", "1000 ms");
        }
      });
    this.add
      .text(50, 250, "[pointerdown + this.game.navigator]", { fill: "#FFFFFF" })
      .setInteractive()
      .on("pointerdown", () => {
        this.cameras.main.shake(1000);
        this.game.navigator.vibrate([1000]);
        if (this.game.socket) {
          this.game.socket.emit("vibration-api", "1000 ms");
        }
      });
    this.add
      .text(50, 300, "[pointerover + window.navigator]", { fill: "#FFFFFF" })
      .setInteractive()
      .on("pointerover", () => {
        this.cameras.main.shake(1000);
        window.navigator.vibrate([1000]);
        if (this.game.socket) {
          this.game.socket.emit("vibration-api", "1000 ms");
        }
      });
    this.add
      .text(50, 350, "[pointerdown + window.navigator]", { fill: "#FFFFFF" })
      .setInteractive()
      .on("pointerdown", () => {
        this.cameras.main.shake(1000);
        window.navigator.vibrate([1000]);
        if (this.game.socket) {
          this.game.socket.emit("vibration-api", "1000 ms");
        }
      });
  }

  update() {}
}
