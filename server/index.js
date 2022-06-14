const { Server } = require("socket.io");
const network = require('network-config');

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


network.interfaces(function(err, interfaces){
  /* interfaces should be something like:

  [{
    name: 'eth0',
    ip: '1.1.1.77',
    netmask: '1.1.1.0',
    mac: 'aa:aa:aa:aa:aa:aa',
    gateway: '10.10.10.1', 
   },
   { ... }, { ... }]
  */
 console.log(interfaces);
 
});