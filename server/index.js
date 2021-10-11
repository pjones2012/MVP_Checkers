const express = require('express');
const db = require('../DBMS');
const app = express();
app.use(express.json());

var PORT = 3000;
var server = app.listen(PORT, ()=> {
  console.log('listening on Port: ', PORT);
})
app.use(express.static(__dirname + '/../dist'));

//const options = {path: __dirname + '/../dist'}; //what kind of options go here??
var io = require("socket.io")(server);

io.on('connection', async socket => {
  // instead of console.logging -> assign each socket to a room
    //console.log('else log', numSockets.length);
    //socket.to(socket.id).emit('PlayerAssign', 'Player 2')

  // if # of sockets is odd make player 1 in new room
  // if # socketes is even make player 2 in room last room
  var numSockets = await io.fetchSockets();
  var leaderboard = await db.getLeaders();
  // emit to that player the # player they are and the room they are in
  socket.on('PlayerAssign', () => {
    let roomNum = Math.ceil(numSockets.length/2);
    if ( numSockets.length % 2 === 1) {
      socket.join(`Room ${roomNum}`)
      console.log('first log', socket.id);
      socket.emit('PlayerAssign', { assign: 'Player 1', leaders: leaderboard});
    } else if (numSockets.length % 2 === 0) {
      socket.join(`Room ${roomNum}`)
      console.log('second log', socket.id);
      socket.emit('PlayerAssign', { assign: 'Player 2', leaders: leaderboard});
    }
  });

  socket.on('PeiceSelected', (data)=>{
    io.sockets.emit('PeiceSelected', data);
  });

  socket.on('PeiceMoved', (data)=>{
    io.sockets.emit('PeiceMoved', data);
  });
});






