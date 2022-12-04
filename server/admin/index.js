// const SOCKET_SERVER = "https://localhost:443";
const SOCKET_SERVER = "https://aidan.town";

function init() {
  let socket = io(SOCKET_SERVER, {
    path: "/socket.io",
  });
  console.log("initializing admin console");

  for (let i = 1; i < 5; i++) {
    createButton(`PLAY ${i}`, () => {
      const data = { type: "play", playerId: 0, videoId: i };
      socket.emit("cmd", data);
    });
  }
}

function createButton(label, callback) {
  let el = document.createElement("button");
  el.innerText = label;
  el.addEventListener("click", callback);
  document.getElementById("container").appendChild(el);
}

init();
