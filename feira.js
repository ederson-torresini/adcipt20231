export default class feira extends Phaser.Scene {
  constructor () {
    super('feira')

    this.escolha = undefined
    this.jogos = [
      {
        indice: 'notte-eterna-z',
        url: 'Notte-Eterna-Z',
        logo: {
          nome: 'logo-notte-eterna-z',
          arquivo: './assets/logos/notte-eterna-z.png'
        },
        qrcode: {
          nome: 'qrcode-notte-eterna-z',
          arquivo: './assets/qrcodes/notte-eterna-z.png'
        }
      },
      {
        indice: 'folclore',
        url: 'Folclore',
        logo: {
          nome: 'logo-folclore',
          arquivo: './assets/logos/folclore.png'
        },
        qrcode: {
          nome: 'qrcode-folclore',
          arquivo: './assets/qrcodes/folclore.png'
        }
      },
      {
        indice: 'god-between-us',
        url: 'God-Between-Us',
        logo: {
          nome: 'logo-god-between-us',
          arquivo: './assets/logos/god-between-us.png'
        },
        qrcode: {
          nome: 'qrcode-god-between-us',
          arquivo: './assets/qrcodes/god-between-us.png'
        }
      },
      {
        indice: 'cattus',
        url: 'Cattus',
        logo: {
          nome: 'logo-cattus',
          arquivo: './assets/logos/cattus.png'
        },
        qrcode: {
          nome: 'qrcode-cattus',
          arquivo: './assets/qrcodes/cattus.png'
        }
      },
      {
        indice: 'em-busca-das-flores-magicas',
        url: 'Em-busca-das-flores-magicas',
        logo: {
          nome: 'logo-em-busca-das-flores-magicas',
          arquivo: './assets/logos/em-busca-das-flores-magicas.png'
        },
        qrcode: {
          nome: 'qrcode-em-busca-das-flores-magicas',
          arquivo: './assets/qrcodes/em-busca-das-flores-magicas.png'
        }
      },
      {
        indice: 'maze-of-the-past',
        url: 'Maze-of-the-past-',
        logo: {
          nome: 'logo-maze-of-the-past',
          arquivo: './assets/logos/maze-of-the-past.png'
        },
        qrcode: {
          nome: 'qrcode-maze-of-the-past',
          arquivo: './assets/qrcodes/maze-of-the-past.png'
        }
      },
      {
        indice: 'triver',
        url: 'Trivert',
        logo: {
          nome: 'logo-trivert',
          arquivo: './assets/logos/trivert.png'
        },
        qrcode: {
          nome: 'qrcode-trivert',
          arquivo: './assets/qrcodes/trivert.png'
        }
      },
      {
        indice: 'escape-room',
        url: 'EscapeRoom',
        logo: {
          nome: 'logo-escape-room',
          arquivo: './assets/logos/escape-room.png'
        },
        qrcode: {
          nome: 'qrcode-escape-room',
          arquivo: './assets/qrcodes/escape-room.png'
        }
      },
      {
        indice: 'joao-maria',
        url: 'Joao-Maria-The-order-of-warder',
        logo: {
          nome: 'logo-joao-maria',
          arquivo: './assets/logos/joao-maria.png'
        },
        qrcode: {
          nome: 'qrcode-joao-maria',
          arquivo: './assets/qrcodes/joao-maria.png'
        }
      }
    ]
  }

  preload () {
    this.load.image('fundo', './assets/fundo.png')
    this.load.spritesheet('botao-casa', './assets/botao-casa.png', {
      frameWidth: 128,
      frameHeight: 128
    })
    this.jogos.forEach((jogo) => {
      this.load.image(jogo.logo.nome, jogo.logo.arquivo)
      this.load.image(jogo.qrcode.nome, jogo.qrcode.arquivo)
    })
    this.load.image('fechar', './assets/fechar.png')
    this.load.spritesheet('jogar', './assets/jogar.png', {
      frameWidth: 402,
      frameHeight: 65
    })
    this.load.audio('trilha', './assets/sons/trilha.mp3')
  }

  create () {
    this.fadingTime = 250
    this.speed = 300
    this.cameras.main.fadeIn(this.fadingTime * 4)

    this.trilha = this.sound.add('trilha')
    this.trilha.loop = true
    this.trilha.play()

    this.jogos.sort(() => Math.random() - 0.5).forEach((jogo, indice) => {
      let x
      let y
      if (indice < this.jogos.length * 0.5) {
        x = this.game.config.width * 0.25
        y = this.game.config.height / Math.round(this.jogos.length * 0.5) * indice + 96
      } else {
        x = this.game.config.width * 0.75
        y = this.game.config.height / (this.jogos.length * 0.5) * (indice - this.jogos.length * 0.5) + 64
      }

      jogo.logo.objeto = this.physics.add
        .sprite(x, y, jogo.logo.nome)
        .setInteractive()
        .on('pointerdown', () => {
          if (!this.escolha) {
            this.cameras.main.fadeOut(this.fadingTime)
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
              camera.fadeIn(this.fadingTime)

              this.escolha = window.location.href + jogo.url + '/'
              this.fechar.setVisible(true)
              this.jogar.setVisible(true)

              this.jogos.forEach((jogo) => {
                jogo.logo.objeto.setVisible(false)
                jogo.qrcode.objeto.setVisible(false)
              })

              jogo.logo.objeto.setVisible(true)
              jogo.logo.objeto.setTint('0x333333')
              jogo.qrcode.objeto.setVisible(true)
            })
          }
        })

      jogo.qrcode.objeto = this.add
        .image(
          this.game.config.width / 2,
          this.game.config.height / 2,
          jogo.qrcode.nome
        )
        .setVisible(false)
    })

    this.fechar = this.add
      .image(this.game.config.width - 64, 64, 'fechar')
      .setInteractive()
      .setVisible(false)
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(this.fadingTime)
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
          camera.fadeIn(this.fadingTime)

          this.escolha = undefined

          this.jogos.forEach((jogo) => {
            jogo.logo.objeto.setVisible(true)
            jogo.qrcode.objeto.setVisible(false)
            jogo.logo.objeto.setTint('0xffffff')
          })

          this.fechar.setVisible(false)
          this.jogar.setVisible(false)
        })
      })

    this.anims.create({
      key: 'jogar-animado',
      frames: this.anims.generateFrameNumbers('jogar', {
        start: 0,
        end: 6
      }),
      frameRate: 10,
      repeat: -1
    })

    this.jogar = this.add
      .sprite(
        this.game.config.width / 2,
        this.game.config.height / 2 + 200,
        'jogar',
        0
      )
      .setInteractive()
      .setVisible(false)
      .anims.play('jogar-animado', true)
      .on('pointerdown', () => {
        window.location.assign(this.escolha)
      })

    this.anims.create({
      key: 'botao-casa',
      frames: this.anims.generateFrameNumbers('botao-casa', {
        start: 0,
        end: 5
      }),
      frameRate: 6,
      repeat: -1
    })

    this.fundo = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'fundo'
    )
    this.botao_casa = this.add
      .sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.8,
        'botao-casa'
      )
      .play('botao-casa')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(250)
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
          this.botao_casa.destroy()
          this.fundo.destroy()
          camera.fadeIn(250)
        })
      })
  }
}
