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
  io.sockets.emit("stop");
  io.sockets.emit("play");
  // playVideo("/home/pi/Downloads/1.mp4");
}, 10000);

function restartVideo() {
  console.log("Telling clients to stop video!");
  io.sockets.emit("stop");
  setTimeout(() => {
    console.log("Telling clients to play video!");
    io.sockets.emit("play");
    // playVideo("/home/pi/Downloads/1.mp4");
  }, 5000);
}

setTimeout(() => {
  restartVideo();
}, 5000);
