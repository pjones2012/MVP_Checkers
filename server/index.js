const express = require('express');
const app = express();
app.use(express.json());

var PORT = 3000;
var server = app.listen(PORT, ()=> {
  console.log('listening on Port: ', PORT);
})
app.use(express.static(__dirname + '/../dist'));

//const options = {path: __dirname + '/../dist'}; //what kind of options go here??
var io = require("socket.io")(server);

io.on('connection', socket => {
  console.log('made socket connection', socket.id);
});






