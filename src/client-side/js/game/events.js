let gameId;
const events = {
  init: (socket) => {
    const drawCard = document.querySelector('[data-component="draw-card"]');
    const playCard = document.querySelector('[data-component="play-card"]');
    const cards = document.querySelector('.cards');

    drawCard.addEventListener('click', function () {
      socket.emit('draw-card', { gameId: gameId });
    });

    playCard.addEventListener('click', function () {
      const card = cards.querySelector('input[name="cards"]:checked').value;
      socket.emit('play-card', { gameId: gameId, card: card });
    });
  },
  setGameId: (id) => {
    gameId = id;
  },
};

export default events;
