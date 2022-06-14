const { Server } = require("socket.io");
const { exec, spawn } = require("child_process");

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
  io.sockets.emit("play");
  playVideo("/home/pi/Downloads/1.mp4");
}, 10000);



function hideMouse() {
  exec("unclutter -idle 1", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}
hideMouse();

function playVideo(filename) {
  var ffplayProcess = spawn("ffplay", [
    filename,
    "-loop",
    "0",
    "-fs",
    "-infbuf",
  ]);

  ffplayProcess.stderr.on("data", function (data) {
    console.log(data.toString());
  });

  ffplayProcess.stderr.on("end", function () {
    console.log("Child process ended.");
  });

  ffplayProcess.stderr.on("exit", function () {
    console.log("Child process exited.");
  });

  ffplayProcess.stderr.on("close", function () {
    console.log("Child process closed.");
  });
}
