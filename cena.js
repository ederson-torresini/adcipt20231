export default class CenaDeAbertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {}

  create() {
    //
    // Testar Geolocation API
    this.txtCoords = this.add.text(50, 100, "", { fill: "#FFFFFF" });
    this.game.navigator.geolocation.watchPosition(
      (pos) => {
        this.txtCoords.setText(
          `Latitude: ${pos.coords.latitude}\nLongitude: ${pos.coords.longitude}`
        );
        this.game.socket.emit("geolocation-api", pos.coords);
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
      .on("pointerdown", () => {
        this.game.navigator.vibrate([1000]);
        this.game.socket.emit("vibration-api", "1000 ms");
      });
  }

  update() {}
}
