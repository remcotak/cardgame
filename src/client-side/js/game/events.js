let gameId;
const events = {
  init: (socket) => {
    const cards = document.querySelector('.cards');
    const playCard = document.querySelector('[data-component="play-card"]');
    const startGame = document.querySelector('[data-component="start-game"]');

    startGame.addEventListener('click', function () {
      socket.emit('start-game', { gameId: gameId }, function () {
        startGame.style.display = 'none';
      });
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
