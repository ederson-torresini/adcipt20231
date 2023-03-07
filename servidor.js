const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  socket.on("entrar-na-sala", (id) => {
    console.log("Jogador %s entrou na partida.", id);
  });
  socket.on("cena", ({ jogador, cena }) => {
    console.log("Jogador %s na cena %s.", jogador, cena);
  });
});

app.use(express.static("./"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
