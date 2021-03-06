function Constants() { };

/*
  card: {
    value: number of how strong the card is,
    count: how much instances of the card should be in deck,
    description: what does the card do,
    pickPlayer: should a player be picked when playing this card
  }
*/
Constants.cards = {
  'princess': {
    value: 8,
    count: 1,
    description: 'If you discard this card, you are out of this round.',
    pickPlayer: false
  },
  'countess': {
    value: 7,
    count: 1,
    description: 'If you have this card and the King or Prince in your hand, you must discard this card.',
    pickPlayer: false
  },
  'king': {
    value: 6,
    count: 1,
    description: 'Trade hands with another player of your choice.',
    pickPlayer: true
  },
  'prince': {
    value: 5,
    count: 2,
    description: 'Choose any player (including yourself) to discard his or her hand and draw a new card.',
    pickPlayer: true
  },
  'handmaid': {
    value: 4,
    count: 2,
    description: 'Until your next turn, Ignore all effects from other players cards.',
    pickPlayer: false
  },
  'baron': {
    value: 3,
    count: 2,
    description: 'You and another player secretly compare hands. The player with the lower value is out of the round.',
    pickPlayer: true
  },
  'priest': {
    value: 2,
    count: 2,
    description: 'Look at another players hand.',
    pickPlayer: true
  },
  'guard': {
    value: 1,
    count: 5,
    description: 'Name a non-Guard card and choose another player, if that player has that card he or she is out of the round.',
    pickPlayer: true
  }
};

Constants.maxCards = 2;

Constants.errors = {
  'no-game': 'No room could be found with the given room code',
}

module.exports = Constants;
