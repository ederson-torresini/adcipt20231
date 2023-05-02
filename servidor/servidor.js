const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("Cliente %s conectado ao servidor.", socket.id);

  socket.on("disconnect", () => {});
});

app.use(express.static("../cliente/"));
server.listen(PORT, () => console.log(`Servidor em execução na porta ${PORT}!`));
