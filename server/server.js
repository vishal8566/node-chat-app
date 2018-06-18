const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');

const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)  =>{
  console.log('New User Connected');

  socket.emit('newEmail', {
      from: "mike@example.com",
      text: "What is going on?",
      createAt: 123
  });

  socket.emit('newMessage', {
      from: "Hello Viosha",
      text: "What is going on?"
  });
  socket.on('createEmail', (newEmail)=> {
      console.log("createEmail",newEmail);
  });

  socket.on('createMessage', (newMessage)=> {
      console.log("createMessage",newMessage);
  });

  socket.on('disconnect', () =>{
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log("server is up on port " + port);
})
