const Constants = require('../shared/Constants');

function Player(socket) {
  this.socket = socket;
  this.cards = [];
};

Player.prototype.addCard = function (card) {
  return this.cards.push(card);
}

Player.prototype.canDraw = function () {
  return this.cards.length < Constants.maxCards;
}

module.exports = Player;
