export default class presenca extends Phaser.Scene {
  constructor () {
    super('presença')
  }

  preload () { }

  create () {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        this.game.midias = stream
      })
      .catch((error) => console.log(error))

    this.jogadores = this.game.jogadores.forEach((jogador, indice) => {
      if (jogador === this.game.socket.id) {
        this.add.text(50, 50 + indice * 50, jogador + ' (você)', {
          fill: '#aaaaaa'
        })
      } else {
        this.add
          .text(50, 50 + indice * 50, jogador)
          .setInteractive()
          .on('pointerdown', () => {
            this.localConnection = new RTCPeerConnection(this.game.ice_servers)

            this.localConnection.onicecandidate = ({ candidate }) => {
              candidate &&
                this.game.socket.emit('candidate', { from: this.game.socket.id, to: jogador, candidate })
            }

            this.localConnection.ontrack = ({ streams: [stream] }) => {
              this.game.audio.srcObject = stream
            }

            this.game.midias
              .getTracks()
              .forEach((track) =>
                this.localConnection.addTrack(track, this.game.midias)
              )

            this.localConnection
              .createOffer()
              .then((offer) => this.localConnection.setLocalDescription(offer))
              .then(() => {
                this.game.socket.emit('offer', { from: this.game.socket.id, to: jogador, description: this.localConnection.localDescription })
              })

            this.game.socket.on('answer', ({ from, to, description }) => {
              this.localConnection.setRemoteDescription(description)
            })

            this.game.socket.on('candidate', ({ from, to, candidate }) => {
              this.localConnection.addIceCandidate(new RTCIceCandidate(candidate))
            })
          })
      }
    })

    this.game.socket.on('offer', ({ from, to, description }) => {
      this.remoteConnection = new RTCPeerConnection(this.game.ice_servers)

      this.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate && this.game.socket.emit('candidate', { from: to, to: from, candidate })
      }

      this.remoteConnection.ontrack = ({ streams: [stream] }) => {
        this.game.audio.srcObject = stream
      }

      this.game.midias
        .getTracks()
        .forEach((track) =>
          this.remoteConnection.addTrack(track, this.game.midias)
        )

      this.game.socket.on('candidate', ({ from, to, candidate }) => {
        this.remoteConnection.addIceCandidate(new RTCIceCandidate(candidate))
      })

      this.atender = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Atender?')

      this.sim = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 25, '[Sim]')
        .setInteractive()
        .on('pointerdown', () => {
          this.remoteConnection
            .setRemoteDescription(description)
            .then(() => this.remoteConnection.createAnswer())
            .then((answer) => this.remoteConnection.setLocalDescription(answer))
            .then(() => {
              this.game.socket.emit('answer', { from: to, to: from, description: this.remoteConnection.localDescription })
            })
        })

      this.nao = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, '[Não]')
        .setInteractive()
        .on('pointerdown', () => {
          this.atender.destroy()
          this.sim.destroy()
          this.nao.destroy()
        })
    })
  }
}
