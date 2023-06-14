export default class registro extends Phaser.Scene {
  constructor () {
    super('registro')
  }

  create () {
    this.mensagem = this.add.text(100, 75, 'Escolha uma sala para entrar:', {
      fontFamily: 'monospace',
      font: '32px Courier',
      fill: '#cccccc'
    })

    this.salas = [
      {
        numero: '0',
        x: 150,
        y: 125,
        botao: undefined
      },
      {
        numero: '1',
        x: 150,
        y: 175,
        botao: undefined
      },
      {
        numero: '2',
        x: 150,
        y: 225,
        botao: undefined
      },
      {
        numero: '3',
        x: 150,
        y: 275,
        botao: undefined
      },
      {
        numero: '4',
        x: 150,
        y: 325,
        botao: undefined
      },
      {
        numero: '5',
        x: 450,
        y: 125,
        botao: undefined
      },
      {
        numero: '6',
        x: 450,
        y: 175,
        botao: undefined
      },
      {
        numero: '7',
        x: 450,
        y: 225,
        botao: undefined
      },
      {
        numero: '8',
        x: 450,
        y: 275,
        botao: undefined
      },
      {
        numero: '9',
        x: 450,
        y: 325,
        botao: undefined
      }
    ]

    this.salas.forEach((item) => {
      item.botao = this.add
        .text(item.x, item.y, '[Sala ' + item.numero + ']', {
          fontFamily: 'monospace',
          font: '32px Courier',
          fill: '#cccccc'
        })
        .setInteractive()
        .on('pointerdown', () => {
          this.game.sala = item.numero
          if (this.game.registro) {
            this.game.socket.emit('entrar-na-sala', this.game.sala)
          } else {
            console.log('Usuário não registrado no servidor.')
          }
        })
    })

    this.game.socket.on('jogadores', (jogadores) => {
      this.game.jogadores = jogadores
      this.mensagem.destroy()
      this.salas.forEach((item) => {
        item.botao.destroy()
      })
      this.game.scene.start('presença')
    })
  }
}
