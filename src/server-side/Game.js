const Constants = require('../shared/Constants');
const Player = require('./Player');

function Game() {
  this.players = {};
  this.deck = this.buildDeck();
  this.burned = [this.withdrawCard()];
  this.played = [];
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
  return this.deck.splice([Math.floor(Math.random() * this.deck.length)], 1)[0];
}

// Draw a card from the deck and put it in the players hand
Game.prototype.drawCard = function (id) {
  // Check if the player can draw any more cards
  if (!this.players[id].canDraw()) { return; }
  // Add the drawn card to the players hand
  return this.players[id].addCard(this.withdrawCard());
};

// Play card from players hand
Game.prototype.playCard = function (id, card) {
  console.log(this.players[id].hasCard(card));
  // Check if the player has the given card in hand
  if (!this.players[id].hasCard(card)) { return; }
  // Remove the card from the players hand
  this.players[id].removeCard(card);
  // Add the card to the played pile
  this.played.push(card);
};

// Send the state to each individual client
Game.prototype.sendState = function () {
  const playerIds = Object.keys(this.players).map(key => key);
  console.log(playerIds);

  Object.keys(this.players).forEach((key) => {
    const player = this.players[key];
    player.socket.emit('update', {
      players: playerIds,
      deck: this.deck,
      burned: this.burned,
      played: this.played,
      cards: player.cards
    });
  });
};

// Add a new player object with the clients socket information
Game.prototype.addNewPlayer = function (socket) {
  this.players[socket.id] = new Player(socket);
  // Draw first card
  this.drawCard(socket.id);
  this.sendState();
};

// Remove player from the player object
Game.prototype.removePlayer = function (id) {
  delete this.players[id];
};

module.exports = Game;
