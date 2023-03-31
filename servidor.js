const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  socket.on("entrar-na-sala", (sala) => {
    socket.join(sala);
    let jogadores = {};
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
    }
    console.log("Sala %s: %s", sala, jogadores);
    io.to(sala).emit("jogadores", jogadores);
  });
  socket.on("offer", (sala, description) => {
    socket.broadcast.to(sala).emit("offer", socket.id, description);
  });
  socket.on("answer", (sala, description) => {
    socket.broadcast.to(sala).emit("answer", description);
  });
  socket.on("candidate", (sala, signal) => {
    socket.broadcast.to(sala).emit("candidate", signal);
  });
  socket.on("disconnect", () => {});
  socket.on("estadoDoJogador", (sala, estado) => {
    socket.broadcast.to(sala).emit("desenharOutroJogador", estado);
  });
});

app.use(express.static("./"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
