const Constants = require('../shared/Constants');
const Player = require('./Player');

function Game() {
  this.players = {};
  this.deck = this.buildDeck();
  this.burned = this.withdrawCard();
}

// Build the deck with the given cards and count
Game.prototype.buildDeck = function () {
  const deck = [];
  Object.keys(Constants.cards).forEach((key) => {
    const card = Constants.cards[key];
    // Push the amount of cards in the deck based on its given count
    for (let i = 0; i < card.count; i++) {
      deck.push(key);
    }
  });
  return deck;
};

// Withdraw card from the deck
Game.prototype.withdrawCard = function () {
  return this.deck.splice([Math.floor(Math.random() * this.deck.length)], 1);
}

// Draw a card from the deck and put it in the players hand
Game.prototype.drawCard = function (id) {
  // Check if the player can draw any more cards
  if (!this.players[id].canDraw()) { return; }
  // // Draw card from the deck and remove it
  // const drawnCard = this.deck.splice([Math.floor(Math.random() * this.deck.length)], 1);
  // Add the drawn card to the players hand
  return this.players[id].addCard(this.withdrawCard());
};

// Send the state to each individual client
Game.prototype.sendState = function () {
  Object.keys(this.players).forEach((key) => {
    const player = this.players[key];
    player.socket.emit('update', { deck: this.deck, burned: this.burned, cards: player.cards });
  });
};

// Add a new player object with the clients socket information
Game.prototype.addNewPlayer = function (socket) {
  this.players[socket.id] = new Player(socket);
  // Draw first card
  this.drawCard(socket.id);
  this.sendState();
};

Game.prototype.removePlayer = function (id) {
  delete this.players[id];
};

module.exports = Game;
