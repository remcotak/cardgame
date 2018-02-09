const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const Hashids = require('hashids');
const Game = require('./server-side/Game');
const Constants = require('./shared/Constants');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;
const hashids = new Hashids();
const games = {};

// Generate hash from unix timestamp
const generateHash = () => {
  const unix = Date.parse(new Date());
  return hashids.encode(unix);
}

app.set('port', port);
// Serve files from dist folder
app.use(express.static('./dist'));
// Starts the server.
server.listen(port, function () {
  console.log(`Starting server on port ${port}`);
});

// Add the WebSocket handlers
io.on('connection', function (socket) {
  console.log(`Client connected with id: ${socket.id}`);
  socket.emit('socketID', socket.id);

  // Create new game
  socket.on('new-game', function (data, callback) {
    // Create hashid for reference to the game
    const id = generateHash();
    // Create new Game with the given hashid
    games[id] = new Game(id);
    // Add the new player to the current game
    games[id].addNewPlayer(socket, { id: socket.id, name: data.name, leader: true });
    // Send game information to the client
    games[id].sendState();
    // Fire callback to let the client know the game has been created
    callback({ gameId: id });
  });

  // Join existing game
  socket.on('join-game', function (data, callback) {
    // Check if a game with the provided gameId exists
    if (!games[data.gameId]) {
      // return an error message when no game has been found
      return callback({ 'error': Constants.errors['no-game'] });
    }
    // Add the new player to the selected game room
    games[data.gameId].addNewPlayer(socket, { id: socket.id, name: data.name });
    // Fire callback to let the client know the game has been joined
    callback();
    // Send game information to the connected clients
    games[data.gameId].sendState();
  });

  // Start the game
  socket.on('start-game', function (data) {
    if (!games[data.gameId]) { return; }
    games[data.gameId].startGame();
  });

  // Play card from hand of the player
  socket.on('play-card', function (data) {
    games[data.gameId].playCard(socket.id, data.card);
    games[data.gameId].sendState();
  });

  // When a player disconnects, remove them from the game.
  socket.on('disconnect', function () {
    console.log(`Client disconnected with id: ${socket.id}`);
    // Inefficient way for removing a player,
    // when games object has a lot of items
    // this will take some computing power
    Object.keys(games).forEach((gameId) => {
      games[gameId].removePlayer({
        socketId: socket.id,
        callback: function (data) {
          delete games[gameId];
        }
      });
    });
  });
});
