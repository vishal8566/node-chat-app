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

  socket.on('createEmail', (newEmail)=> {
      console.log("createEmail",newEmail);
  });

  socket.on('createMessage', (newMessage)=> {
      console.log("createMessage",newMessage);
      io.emit('newMessage',{
        from: newMessage.from,
        text: newMessage.text,
        createAt: new Date().getTime()
      });
  });

  socket.on('disconnect', () =>{
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log("server is up on port " + port);
})
