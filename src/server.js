const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const Hashids = require('hashids');
const Game = require('./server-side/Game');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const hashids = new Hashids('', 5);
let gamesCount = 0;
const games = {};
const game = new Game();

app.set('port', 3000);
app.use(express.static('../dist'));
// Starts the server.
server.listen(3000, function () {
  console.log('Starting server on port 3000');
});

// Add the WebSocket handlers
io.on('connection', function (socket) {
  console.log(`Client connected with id: ${socket.id}`);
  socket.emit('socketID', socket.id);

  game.addNewPlayer(socket, 'test');

  socket.on('start-game', function (data, callback) {
    gamesCount += 1;
    const id = hashids.encode(gamesCount)
    games[id] = new Game();
    callback(games);
  });

  socket.on('draw-card', function () {
    console.log('draw card for: ', socket.id);
    game.drawCard(socket.id);
    game.sendState();
  });

  socket.on('play-card', function (card) {
    game.playCard(socket.id, card);
    game.sendState();
  });

  // When a player disconnects, remove them from the game.
  socket.on('disconnect', function () {
    console.log(`Client disconnected with id: ${socket.id}`);
    game.removePlayer(socket.id);
  });
});
