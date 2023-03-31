export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
    this.ice_servers = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
    this.audio = document.querySelector("audio");
    this.midias = undefined
  }

  preload() {
    this.load.image("grade", "./assets/grade.png");
  }

  create() {
    this.grade = this.add.tileSprite(400, 225, 600, 300, "grade");
    this.mensagem = this.add.text(100, 75, "Escolha uma sala para entrar:", {
      fontFamily: "monospace",
      font: "32px Courier",
      fill: "#cccccc",
    });
    this.salas = [
      {
        numero: "0",
        x: 150,
        y: 125,
        botao: undefined,
      },
      {
        numero: "1",
        x: 150,
        y: 175,
        botao: undefined,
      },
      {
        numero: "2",
        x: 150,
        y: 225,
        botao: undefined,
      },
      {
        numero: "3",
        x: 150,
        y: 275,
        botao: undefined,
      },
      {
        numero: "4",
        x: 150,
        y: 325,
        botao: undefined,
      },
      {
        numero: "5",
        x: 450,
        y: 125,
        botao: undefined,
      },
      {
        numero: "6",
        x: 450,
        y: 175,
        botao: undefined,
      },
      {
        numero: "7",
        x: 450,
        y: 225,
        botao: undefined,
      },
      {
        numero: "8",
        x: 450,
        y: 275,
        botao: undefined,
      },
      {
        numero: "9",
        x: 450,
        y: 325,
        botao: undefined,
      },
    ];
    this.salas.forEach((item) => {
      item.botao = this.add
        .text(item.x, item.y, "[Sala " + item.numero + "]", {
          fontFamily: "monospace",
          font: "32px Courier",
          fill: "#cccccc",
        })
        .setInteractive();
      item.botao.on("pointerdown", () => {
        this.mensagem.setText("Aguardando segundo jogador...");
        this.salas.forEach((item) => {
          item.botao.destroy();
        });
        this.sala = item.numero;
        console.log("Pedido de entrada na sala %s.", this.sala);
        if (this.game.socket) {
          this.game.socket.emit("entrar-na-sala", this.sala);
        }
      });
    });
    this.game.socket.on("jogadores", (jogadores) => {
      if (jogadores.primeiro === this.game.socket.id) {
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            this.midias = stream;
          })
          .catch((error) => console.log(error));
      } else if (jogadores.segundo === this.game.socket.id) {
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            this.midias = stream;
            this.localConnection = new RTCPeerConnection(this.ice_servers);
            stream
              .getTracks()
              .forEach((track) => this.localConnection.addTrack(track, stream));
            this.localConnection.onicecandidate = ({ candidate }) => {
              candidate && this.game.socket.emit("candidate", this.sala, candidate);
            };
            console.log(this.midias);
            this.localConnection.ontrack = ({ streams: [stream] }) => {
              this.audio.srcObject = stream;
            };
            this.localConnection
              .createOffer()
              .then((offer) => this.localConnection.setLocalDescription(offer))
              .then(() => {
                this.game.socket.emit("offer", this.sala, this.localConnection.localDescription);
              });
          })
          .catch((error) => console.log(error));
      }
      console.log(jogadores);
      if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {
        this.mensagem.destroy();
        this.grade.destroy();
      }
    });
    this.game.socket.on("offer", (socketId, description) => {
      this.remoteConnection = new RTCPeerConnection(this.ice_servers);
      this.midias
        .getTracks()
        .forEach((track) => this.remoteConnection.addTrack(track, this.midias));
      this.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate && this.game.socket.emit("candidate", socketId, candidate);
      };
      this.remoteConnection.ontrack = ({ streams: [midias] }) => {
        this.audio.srcObject = this.midias;
      };
      this.remoteConnection
        .setRemoteDescription(description)
        .then(() => this.remoteConnection.createAnswer())
        .then((answer) => this.remoteConnection.setLocalDescription(answer))
        .then(() => {
          this.game.socket.emit(
            "answer",
            socketId,
            this.remoteConnection.localDescription
          );
        });
    });
    this.game.socket.on("answer", (description) => {
      this.localConnection.setRemoteDescription(description);
    });
    this.game.socket.on("candidate", (candidate) => {
      let conn = this.localConnection || this.remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }

  upload() {}
}
