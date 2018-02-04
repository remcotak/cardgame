const Constants = require('../shared/Constants');
const Player = require('./Player');

function Game() {
  this.deck = Constants.cards;
  this.players = {};
}

// Draw a card from the deck and put it in the players hand
Game.prototype.drawCard = function (id) {
  // Check if the player can draw any more cards
  if (!this.players[id].canDraw()) { return; }
  // Draw card from the deck and remove it
  const drawnCard = this.deck.splice([Math.floor(Math.random() * this.deck.length)], 1);
  // Add the drawn card to the players hand
  return this.players[id].addCard(drawnCard);
}

// Send the state to each individual client
Game.prototype.sendState = function () {
  Object.keys(this.players).forEach((key) => {
    const player = this.players[key];
    player.socket.emit('update', { deck: this.deck, cards: player.cards });
  });
}

// Add a new player object with the clients socket information
Game.prototype.addNewPlayer = function (socket) {
  this.players[socket.id] = new Player(socket);
  // Draw first card
  this.drawCard(socket.id);
  this.sendState();
}

Game.prototype.removePlayer = function (id) {
  delete this.players[id];
}

module.exports = Game;
