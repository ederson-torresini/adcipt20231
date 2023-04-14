export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    /* Tilemap */
    this.load.tilemapTiledJSON(
      "mapa-principal-terreo",
      "./assets/principal-terreo.json"
    );

    /* Tilesets */
    this.load.image("terreno", "./assets/terreno.png");
    this.load.image("ARCas", "./assets/ARCas.png");

    /* Personagem 1 */
    this.load.spritesheet("robo-1", "./assets/robo-1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Personagem 2 */
    this.load.spritesheet("robo-2", "./assets/robo-2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Artefato */
    this.load.spritesheet("cristal", "./assets/cristal.png", {
      frameWidth: 32,
      frameHeight: 56,
    });

    /* Botões */
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
  }

  create() {
    /* Tilemap */
    this.mapa_principal_terreo = this.make.tilemap({
      key: "mapa-principal-terreo",
    });

    /* Tilesets */
    this.tileset_principal_terreo_terreno =
      this.mapa_principal_terreo.addTilesetImage("terreno", "terreno");

    this.tileset_principal_terreo_ARCas =
      this.mapa_principal_terreo.addTilesetImage("ARCas", "ARCas");

    /* Camada 0: terreno */
    this.terreno = this.mapa_principal_terreo.createLayer(
      "terreno",
      this.tileset_principal_terreo_terreno,
      0,
      0
    );

    /* Personagem 1 */
    this.jogador_1 = this.physics.add.sprite(300, 225, "robo-1");

    this.anims.create({
      key: "jogador-1-parado",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "jogador-1-cima",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 64,
        end: 79,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-1-baixo",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 0,
        end: 15,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-1-esquerda",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 96,
        end: 111,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-1-direita",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 32,
        end: 47,
      }),
      frameRate: 30,
      repeat: -1,
    });

    /* Personagem 2 */
    this.jogador_2 = this.add.sprite(600, 225, "robo-2");

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

    /* Camada 1: ARCas */
    this.ARCas = this.mapa_principal_terreo.createLayer(
      "ARCas",
      this.tileset_principal_terreo_ARCas,
      0,
      0
    );

    /* Botões */
    this.cima = this.add
      .sprite(120, 330, "cima", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-200);
        this.jogador_1.anims.play("jogador-1-cima");
      })
      .on("pointerout", () => {
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador-1-parado");
      })
      .setScrollFactor(0);

    this.baixo = this.add
      .sprite(120, 400, "baixo", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.baixo.setFrame(1);
        this.jogador_1.setVelocityY(200);
        this.jogador_1.anims.play("jogador-1-baixo");
      })
      .on("pointerout", () => {
        this.baixo.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador-1-parado");
      })
      .setScrollFactor(0);

    this.esquerda = this.add
      .sprite(50, 400, "esquerda", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.esquerda.setFrame(1);
        this.jogador_1.setVelocityX(-200);
        this.jogador_1.anims.play("jogador-1-esquerda");
      })
      .on("pointerout", () => {
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador-1-parado");
      })
      .setScrollFactor(0);

    this.direita = this.add
      .sprite(190, 400, "direita", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.direita.setFrame(1);
        this.jogador_1.setVelocityX(200);
        this.jogador_1.anims.play("jogador-1-direita");
      })
      .on("pointerout", () => {
        this.direita.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador-1-parado");
      })
      .setScrollFactor(0);

    /* Colisões por tile */
    this.terreno.setCollisionByProperty({ collides: true });
    this.ARCas.setCollisionByProperty({ collides: true });

    /* Colisão entre personagem 1 e mapa (por layer) */
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

    /* Colisão com os limites da cena */
    this.jogador_1.setCollideWorldBounds(true);

    /* Cena (960) maior que a tela (800x450) */
    this.cameras.main.setBounds(0, 0, 960, 960);
    this.physics.world.setBounds(0, 0, 960, 960);
    this.cameras.main.startFollow(this.jogador_1);
  }

  update() {}

  colidir_mapa() {
    /* Tremer a tela por 100 ms com baixa intensidade (0.01) */
    this.cameras.main.shake(100, 0.01);

    /* Vibrar o celular pelos mesmos 100 ms */
    window.navigator.vibrate([100]);
  }
}
