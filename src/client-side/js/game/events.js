let gameId;
const events = {
  init: (socket) => {
    const component = document.querySelector('[data-component="game-container"]');

    if (!component) { return; }

    const startGame = component.querySelector('[data-component-bind="start-game"]');
    const cards = component.querySelector('[data-component-bind="player-cards"]');
    const playerList = component.querySelector('[data-component-bind="player-list"]');
    const playCard = component.querySelector('[data-component-bind="play-card"]');

    startGame.addEventListener('click', function () {
      socket.emit('start-game', { gameId: gameId });
    });

    cards.addEventListener('change', function () {
      playCard.disabled = false;
    });

    playCard.addEventListener('click', function () {
      const card = cards.querySelector('input[name="cards"]:checked').value;
      socket.emit('play-card', { gameId: gameId, card: card });
      this.disabled = true;
    });
  },
  setGameId: (id) => {
    gameId = id;
  },
};

export default events;
