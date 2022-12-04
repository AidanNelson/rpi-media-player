const { io } = require("socket.io-client");
const { exec, spawn } = require("child_process");

// store a reference to the current ffplay process (if any)
let ffplayProcess;

// const SOCKET_SERVER = "https://localhost:443";
const SOCKET_SERVER = "https://aidan.town";

let socket = io(SOCKET_SERVER, {
  path: "/socket.io",
});

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("play", () => {
  console.log("Playing video!");
  playVideo("/home/pi/video.mp4");
});

socket.on("stop", () => {
  console.log("Stopping video playback!");
  stopPlayback();
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

function stopPlayback() {
  if (ffplayProcess) {
    ffplayProcess.kill("SIGINT");
    ffplayProcess = false;
  }
}

function playVideo(filename) {
  ffplayProcess = spawn("ffplay", [filename, "-loop", "0", "-fs", "-infbuf"]);

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
