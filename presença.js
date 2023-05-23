export default class presenca extends Phaser.Scene {
  constructor() {
    super("presença");
  }

  preload() {}

  create() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        console.log(stream);
        this.game.midias = stream;
      })
      .catch((error) => console.log(error));

    this.jogadores = this.game.jogadores.forEach((jogador, indice) => {
      if (jogador === this.game.socket.id) {
        this.add.text(50, 50 + indice * 50, jogador + " (você)", {
          fill: "#aaaaaa",
        });
      } else {
        this.add
          .text(50, 50 + indice * 50, jogador)
          .setInteractive()
          .on("pointerdown", () => {
            this.localConnection = new RTCPeerConnection(this.game.ice_servers);

            this.game.midias
              .getTracks()
              .forEach((track) =>
                this.localConnection.addTrack(track, this.game.midias)
              );

            this.localConnection.onicecandidate = ({ candidate }) => {
              candidate &&
                this.game.socket.emit("candidate", jogador, candidate);
            };

            let midias = this.game.midias;
            this.localConnection.ontrack = ({ streams: [midias] }) => {
              this.game.audio.srcObject = this.game.midias;
            };

            this.localConnection
              .createOffer()
              .then((offer) => this.localConnection.setLocalDescription(offer))
              .then(() => {
                this.game.socket.emit(
                  "offer",
                  this.game.socket.id,
                  jogador,
                  this.localConnection.localDescription
                );
              });
          });
      }
    });

    this.game.socket.on("offer", (from, to, description) => {
      this.remoteConnection = new RTCPeerConnection(this.ice_servers);

      this.game.midias
        .getTracks()
        .forEach((track) =>
          this.remoteConnection.addTrack(track, this.game.midias)
        );

      this.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate && this.game.socket.emit("candidate", to, from, candidate);
      };

      let midias = this.game.midias;
      this.remoteConnection.ontrack = ({ streams: [midias] }) => {
        this.game.audio.srcObject = this.game.midias;
      };

      this.remoteConnection
        .setRemoteDescription(description)
        .then(() => this.remoteConnection.createAnswer())
        .then((answer) => this.remoteConnection.setLocalDescription(answer))
        .then(() => {
          this.game.socket.emit(
            "answer",
            to,
            from,
            this.remoteConnection.localDescription
          );
        });
    });

    this.game.socket.on("answer", (from, to, description) => {
      this.localConnection.setRemoteDescription(description);
    });

    this.game.socket.on("candidate", (from, to, candidate) => {
      let conn = this.localConnection || this.remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }

  update() {}
}
