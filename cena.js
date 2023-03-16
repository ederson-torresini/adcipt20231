export default class CenaDeAbertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {}

  create() {
    //
    // Testar Geolocation API
    this.txtCoords = this.add.text(50, 100, "", { fill: "#FFFFFF" });
    navigator.geolocation.watchPosition(
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
    this.btVibrationApi = this.add
      .text(50, 200, "Vibration API", { fill: "#FFFFFF" })
      .setInteractive()
      .on("pointerover", () => {
        this.cameras.main.shake(1000);
        navigator.vibrate([1000]);
        if (this.game.socket) {
          this.game.socket.emit("vibration-api", "1000 ms");
        }
      });
  }

  update() {}
}
