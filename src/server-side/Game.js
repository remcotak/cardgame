const Constants = require('../shared/Constants');
const Player = require('./Player');

function Game(id) {
  this.id = id;
  this.clients = new Map();
  this.players = new Map();
  this.hasStarted = false;
  this.orderedPlayers = [];
  this.currentPlayer = [];

  this.deck = this.buildDeck();
  this.burned = [];
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

// Pick starting player randomly
Game.prototype.pickRandomPlayer = function () {
  return Math.floor(Math.random() * this.players.size);
};

// Order players based on the picked starter player
Game.prototype.orderPlayers = function (firstPlayerIndex) {
  let players = [];

  this.players.forEach((player) => {
    players.push(player);
  });

  const firstPlayers = players.slice(firstPlayerIndex, players.length);
  const restplayers = players.slice(0, firstPlayerIndex);
  this.orderedPlayers = [...firstPlayers, ...restplayers];
};

// Start the game by dealing each player 1 card,
// starting with a randomly picked player
Game.prototype.startGame = function () {
  this.hasStarted = true;
  this.orderPlayers(this.pickRandomPlayer());
  // For each player draw a card
  this.orderedPlayers.forEach((player => {
    this.drawCard(player.id);
  }));
  // Burn 1 card
  this.burned.push(this.withdrawCard());
  // Set starting player
  this.currentPlayer = this.orderedPlayers[0];
  // Draw 2nd card for the starting player
  this.drawCard(this.orderedPlayers[0].id);

  this.sendState();
};

// Play card from players hand
Game.prototype.playCard = function (id, card) {
  // Check if the player has the given card in hand
  if (!this.players.get(id).hasCard(card)) { return; }
  // Remove the card from the players hand
  this.players.get(id).removeCard(card);
  // Add the card to the played pile
  this.played.push(card);
};

// Draw a card from the deck and put it in the players hand
Game.prototype.drawCard = function (id) {
  // Check if the player can draw any more cards
  if (!this.players.get(id).canDraw()) { return; }
  // Add the drawn card to the players hand
  this.players.get(id).addCard(this.withdrawCard());
};

// Send the state to each individual client
Game.prototype.sendState = function () {
  const playerNames = [];
  this.players.forEach((player) => {
    playerNames.push(player.name);
  });
  let playersTurn = this.hasStarted ? this.currentPlayer.name : [];

  this.players.forEach((player) => {
    playersTurn = player.name === playersTurn ? true : playersTurn;
    console.log(playersTurn);
    const client = this.clients.get(player.id);

    client.emit('update', {
      gameId: this.id,
      deck: this.deck,
      burned: this.burned,
      played: this.played,
      playerNames,
      player,
      playersTurn
    });
  });
};

// Add a new player object with the clients socket information
Game.prototype.addNewPlayer = function (socket, name) {
  this.clients.set(socket.id, socket);
  this.players.set(socket.id, new Player(name))
};

// Remove player from the player object
Game.prototype.removePlayer = function (data) {
  // If the game has a player with the given socket id,
  // remove it from the game
  if (!this.players.has(data.socketId)) { return; }
  this.players.delete(data.socketId);

  // If the game has no players left,
  // fire the callback function that will remove the entire game object
  if (this.players.size !== 0) { return; }
  data.callback();
};

module.exports = Game;
