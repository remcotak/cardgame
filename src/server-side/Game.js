const Player = require('./Player');
const Constants = require('../shared/Constants');

function Game() {
  this.deck = Constants.cards;

  this.players = [];
}

Game.prototype.drawCard = function (id) {
  return this.deck.splice([Math.floor(Math.random() * this.deck.length)], 1);
}

Game.prototype.addNewPlayer = function (socket) {
  this.players.push(
    new Player(socket, this.drawCard())
  );
}

Game.prototype.sendState = function () {
  this.players.forEach((player) => {
    return player.socket.emit('update', player.cards);
  });
}

module.exports = Game;
