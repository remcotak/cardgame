const events = {
  init: (socket) => {
    const drawCard = document.querySelector('[data-component="draw-card"]');
    const playCard = document.querySelector('[data-component="play-card"]');

    drawCard.addEventListener('click', function () {
      console.log('clicked draw');
      socket.emit('draw-card');
    });

    playCard.addEventListener('click', function () {
      const card = cards.querySelector('input[name="cards"]:checked').value;
      console.log('play card: ', card);
      socket.emit('play-card', card);
    });
  },
};

export default events;
