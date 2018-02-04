const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const Game = require('./server-side/Game');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const game = new Game();

app.set('port', 5000);
app.use(express.static('../dist'));
// Starts the server.
server.listen(5000, function () {
  console.log('Starting server on port 5000');
});

// Add the WebSocket handlers
io.on('connection', function (socket) {
  console.log(`Client connected with id: ${socket.id}`);
  socket.emit('socketID', socket.id);

  game.addNewPlayer(socket);

  socket.on('draw-card', function () {
    game.drawCard(socket.id);
    game.sendState();
  });

  // When a player disconnects, remove them from the game.
  socket.on('disconnect', function () {
    console.log(`Client disconnected with id: ${socket.id}`);
    game.removePlayer(socket.id);
  });
});
