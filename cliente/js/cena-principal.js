export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    this.load.tilemapTiledJSON(
      "mapa-principal-terreo",
      "./assets/principal-terreo.json"
    );

    this.load.image("terreno", "./assets/terreno.png");
    this.load.image("ARCas", "./assets/ARCas.png");

    this.load.spritesheet("robo-1", "./assets/robo-1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("robo-2", "./assets/robo-2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("cristal", "./assets/cristal.png", {
      frameWidth: 32,
      frameHeight: 56,
    });

    this.load.spritesheet("cima", "./assets/cima.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("baixo", "./assets/baixo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("esquerda", "./assets/esquerda.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("direita", "./assets/direita.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("tela-cheia", "./assets/tela-cheia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.audio("techno-trilha", "./assets/techno.mp3");
    this.load.audio("metal-som", "./assets/metal.mp3");
    this.load.audio("cristal-som", "./assets/cristal.mp3");
  }

  create() {
    this.trilha = this.sound.add("techno-trilha");
    this.trilha.loop = true;
    //this.trilha.play();

    this.mapa_principal_terreo = this.make.tilemap({
      key: "mapa-principal-terreo",
    });

    this.tileset_principal_terreo_terreno =
      this.mapa_principal_terreo.addTilesetImage("terreno", "terreno");

    this.tileset_principal_terreo_ARCas =
      this.mapa_principal_terreo.addTilesetImage("ARCas", "ARCas");

    this.terreno = this.mapa_principal_terreo.createLayer(
      "terreno",
      this.tileset_principal_terreo_terreno,
      0,
      0
    );

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "robo-1";
      this.jogador_1 = this.physics.add.sprite(300, 225, this.local);
      this.remoto = "robo-2";
      this.jogador_2 = this.add.sprite(600, 225, this.remoto);
    } else {
      this.remoto = "robo-1";
      this.jogador_2 = this.add.sprite(300, 225, this.remoto);
      this.local = "robo-2";
      this.jogador_1 = this.physics.add.sprite(600, 225, this.local);

      /* Captura de áudio */
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          console.log(stream);

          /* Consulta ao(s) servidor(es) ICE */
          this.game.localConnection = new RTCPeerConnection(
            this.game.ice_servers
          );

          /* Associação de mídia com conexão remota */
          stream
            .getTracks()
            .forEach((track) =>
              this.game.localConnection.addTrack(track, stream)
            );

          /* Oferta de candidatos ICE */
          this.game.localConnection.onicecandidate = ({ candidate }) => {
            candidate &&
              this.game.socket.emit("candidate", this.game.sala, candidate);
          };

          /* Associação com o objeto HTML de áudio */
          this.game.localConnection.ontrack = ({ streams: [stream] }) => {
            this.game.audio.srcObject = stream;
          };

          /* Oferta de mídia */
          this.game.localConnection
            .createOffer()
            .then((offer) =>
              this.game.localConnection.setLocalDescription(offer)
            )
            .then(() => {
              this.game.socket.emit(
                "offer",
                this.game.sala,
                this.game.localConnection.localDescription
              );
            });

          this.game.midias = stream;
        })
        .catch((error) => console.log(error));
    }

    /* Recebimento de oferta de mídia */
    this.game.socket.on("offer", (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.game.ice_servers);

      /* Associação de mídia com conexão remota */
      this.game.midias
        .getTracks()
        .forEach((track) =>
          this.game.remoteConnection.addTrack(track, this.game.midias)
        );

      /* Contraoferta de candidatos ICE */
      this.game.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          this.game.socket.emit("candidate", this.game.sala, candidate);
      };

      /* Associação com o objeto HTML de áudio */
      let midias = this.game.midias;
      this.game.remoteConnection.ontrack = ({ streams: [midias] }) => {
        console.log(midias);
        this.game.audio.srcObject = midias;
      };

      /* Contraoferta de mídia */
      this.game.remoteConnection
        .setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) =>
          this.game.remoteConnection.setLocalDescription(answer)
        )
        .then(() => {
          this.game.socket.emit(
            "answer",
            this.game.sala,
            this.game.remoteConnection.localDescription
          );
        });
    });

    /* Recebimento de contraoferta de mídia */
    this.game.socket.on("answer", (description) => {
      this.game.localConnection.setRemoteDescription(description);
    });

    /* Recebimento de candidato ICE */
    this.game.socket.on("candidate", (candidate) => {
      let conn = this.game.localConnection || this.game.remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });

    this.anims.create({
      key: "jogador-parado",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "jogador-cima",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 64,
        end: 79,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-baixo",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 15,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-esquerda",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 96,
        end: 111,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-direita",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 32,
        end: 47,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.cristal = this.physics.add.sprite(700, 300, "cristal");

    this.anims.create({
      key: "cristal-brilhando",
      frames: this.anims.generateFrameNumbers("cristal", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.cristal.anims.play("cristal-brilhando");

    this.ARCas = this.mapa_principal_terreo.createLayer(
      "ARCas",
      this.tileset_principal_terreo_ARCas,
      0,
      0
    );

    this.cima = this.add
      .sprite(120, 330, "cima", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-200);
        this.jogador_1.anims.play("jogador-cima");
      })
      .on("pointerout", () => {
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador-parado");
      })
      .setScrollFactor(0);

    this.baixo = this.add
      .sprite(120, 400, "baixo", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.baixo.setFrame(1);
        this.jogador_1.setVelocityY(200);
        this.jogador_1.anims.play("jogador-baixo");
      })
      .on("pointerout", () => {
        this.baixo.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador-parado");
      })
      .setScrollFactor(0);

    this.esquerda = this.add
      .sprite(50, 400, "esquerda", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.esquerda.setFrame(1);
        this.jogador_1.setVelocityX(-200);
        this.jogador_1.anims.play("jogador-esquerda");
      })
      .on("pointerout", () => {
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador-parado");
      })
      .setScrollFactor(0);

    this.direita = this.add
      .sprite(190, 400, "direita", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.direita.setFrame(1);
        this.jogador_1.setVelocityX(200);
        this.jogador_1.anims.play("jogador-direita");
      })
      .on("pointerout", () => {
        this.direita.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador-parado");
      })
      .setScrollFactor(0);

    this.tela_cheia = this.add
      .sprite(750, 50, "tela-cheia", 0)
      .setInteractive()
      .on("pointerdown", () => {
        if (this.scale.isFullscreen) {
          this.tela_cheia.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          this.tela_cheia.setFrame(1);
          this.scale.startFullscreen();
        }
      })
      .setScrollFactor(0);

    this.terreno.setCollisionByProperty({ collides: true });
    this.ARCas.setCollisionByProperty({ collides: true });

    this.physics.add.collider(
      this.jogador_1,
      this.terreno,
      this.colidir_mapa,
      null,
      this
    );

    this.physics.add.collider(
      this.jogador_1,
      this.ARCas,
      this.colidir_mapa,
      null,
      this
    );

    this.jogador_1.setCollideWorldBounds(true);
    this.cameras.main.setBounds(0, 0, 960, 960);
    this.physics.world.setBounds(0, 0, 960, 960);
    this.cameras.main.startFollow(this.jogador_1);

    this.physics.add.collider(
      this.jogador_1,
      this.cristal,
      this.coletar_cristal,
      null,
      this
    );

    this.metal_som = this.sound.add("metal-som");
    this.cristal_som = this.sound.add("cristal-som");

    this.game.socket.on("estado-notificar", ({ frame, x, y }) => {
      this.jogador_2.setFrame(frame);
      this.jogador_2.x = x;
      this.jogador_2.y = y;
    });

    this.game.socket.on("artefatos-notificar", (artefatos) => {
      if (artefatos.cristal) {
        this.cristal.disableBody(true, true);
      }
    });
  }

  update() {
    let frame;
    try {
      frame = this.jogador_1.anims.getFrameName();
    } catch (e) {
      frame = 0;
    }
    this.game.socket.emit("estado-publicar", this.game.sala, {
      frame: frame,
      x: this.jogador_1.body.x + 32,
      y: this.jogador_1.body.y + 32,
    });
  }

  colidir_mapa() {
    this.cameras.main.shake(100, 0.01);
    if (window.navigator.vibrate) {
      window.navigator.vibrate([100]);
    }
    this.metal_som.play();
  }

  coletar_cristal() {
    this.cristal.disableBody(true, true);
    this.cristal_som.play();
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      cristal: true,
    });
  }
}
