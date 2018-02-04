function Player(socket, card) {
  this.socket = socket;
  this.cards = [card];
};

Player.prototype.addCard = function (card) {
  return this.cards.push(card);
}

module.exports = Player;
