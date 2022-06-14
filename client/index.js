const { io } = require("socket.io-client");
const { exec, spawn } = require("child_process");

let socket = io("http://192.168.1.10:3000", {
  path: "/socket.io",
});

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("play", () => {
  console.log("Playing video");

  playVideo("/home/pi/Downloads/1.mp4");
});

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
