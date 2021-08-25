var express = require('express');
var PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/../dist'));
app.listen(PORT, ()=> {
  console.log('listening on Port: ', PORT);
})