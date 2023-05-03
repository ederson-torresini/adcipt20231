const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("Usuário %s conectado no servidor.", socket.id);

  socket.on("entrar-na-sala", (sala) => {
    socket.join(sala);
    console.log("Usuário %s entrou na sala %s.", socket.id, sala);

    var jogadores = {};
    if (io.sockets.adapter.rooms.get(sala).size === 1) {
      jogadores = {
        primeiro: socket.id,
        segundo: undefined,
      };
    } else if (io.sockets.adapter.rooms.get(sala).size === 2) {
      let [primeiro] = io.sockets.adapter.rooms.get(sala);
      jogadores = {
        primeiro: primeiro,
        segundo: socket.id,
      };
      console.log(
        "Sala %s com 2 jogadores. Partida pronta para iniciar.",
        sala
      );
    }

    io.to(sala).emit("jogadores", jogadores);
  });

  socket.on("estado-publicar", (sala, estado) => {
    socket.broadcast.to(sala).emit("estado-notificar", estado);
  });

  socket.on("arfetatos-publicar", (sala, artefatos) => {
    socket.broadcast.to(sala).emit("arfetatos-notificar", artefatos);
  });

  socket.on("disconnect", () => {});
});

app.use(express.static("../cliente/"));
server.listen(PORT, () =>
  console.log(`Servidor em execução na porta ${PORT}!`)
);
