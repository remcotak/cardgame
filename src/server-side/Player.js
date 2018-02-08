const Constants = require('../shared/Constants');

function Player(data) {
  this.id = data.id;
  this.name = data.name;
  this.leader = data.leader ? data.leader : false;
  this.cards = [];
};

Player.prototype.addCard = function (card) {
  this.cards.push(card);
}

Player.prototype.removeCard = function (card) {
  const cardIndex = this.cards.indexOf(card);
  this.cards.splice(cardIndex, 1);
}

Player.prototype.hasCard = function (card) {
  return this.cards.includes(card);
}

Player.prototype.canDraw = function () {
  return this.cards.length < Constants.maxCards;
}

module.exports = Player;
