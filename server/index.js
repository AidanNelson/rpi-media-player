const { Server } = require("socket.io");

const io = new Server();
const clients = {};

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  clients[socket.id] = {};
});

io.listen(3000);
console.log("Server listening on port 3000");


setTimeout(() => {
  console.log("Telling clients to play video!");
  io.sockets.emit('play');
},10000);