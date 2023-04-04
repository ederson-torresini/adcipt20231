export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    //
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON(
      "mapa-principal-terreo",
      "./assets/principal-terreo.json"
    );
    // Tilesets
    this.load.image("chao", "./assets/chao.png");
    this.load.image("tijolos", "./assets/tijolos.png");
    //
    // Personagem 1
    this.load.spritesheet("robo-1", "./assets/robo-1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    //
    // Personagem 2
    this.load.spritesheet("robo-2", "./assets/robo-2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    // Mapa
    // Tilemap
    this.mapa_principal_terreo = this.make.tilemap({
      key: "mapa-principal-terreo",
    });
    // Tilesets
    this.tileset_principal_terreo_chao =
      this.mapa_principal_terreo.addTilesetImage("chao", "chao");
    this.tileset_principal_terreo_parede =
      this.mapa_principal_terreo.addTilesetImage("tijolos", "tijolos");
    // Layer 0: chão
    this.chao = this.mapa_principal_terreo.createLayer(
      "chao",
      this.tileset_principal_terreo_chao,
      0,
      0
    );
    // Layer 1: parede
    this.parede = this.mapa_principal_terreo.createLayer(
      "parede",
      this.tileset_principal_terreo_parede,
      0,
      0
    );
    //
    // Personagem 1
    this.jogador_1 = this.physics.add.sprite(200, 225, "robo-1");
    this.anims.create({
      key: "jogador-1-direita",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 0,
        end: 15,
      }),
      frameRate: 30,
      repeat: -1,
    });
    this.jogador_1.anims.play("jogador-1-direita", true);
    this.jogador_1.setVelocityY(-50);
    //
    // Personagem 2
    this.jogador_2 = this.physics.add.sprite(600, 225, "robo-2");
    this.anims.create({
      key: "jogador-2-direita",
      frames: this.anims.generateFrameNumbers("robo-2", {
        start: 32,
        end: 47,
      }),
      frameRate: 30,
      repeat: -1,
    });
    this.jogador_2.anims.play("jogador-2-direita", true);
    this.jogador_2.setVelocityX(50);
    //
    // Colisões
    // Por tile
    this.chao.setCollisionByProperty({ collides: true });
    this.parede.setCollisionByProperty({ collides: true });
    // Colisão entre personagem 1 e mapa (por layer)
    this.physics.add.collider(this.jogador_1, this.chao, null, null, this);
    this.physics.add.collider(this.jogador_1, this.parede, null, null, this);
  }

  update() {}
}
