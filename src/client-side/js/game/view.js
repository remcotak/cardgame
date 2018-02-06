const view = {
  init: (socket) => {
    const connectedPlayers = document.querySelector('.connected');
    const cards = document.querySelector('.cards');
    const deck = document.querySelector('.deck');
    const burned = document.querySelector('.burned');
    const played = document.querySelector('.played');
    const socketId = document.querySelector('.socket-id');

    socket.on('socketID', function (data) {
      socketId.innerHTML = data;
      console.log(`socket id: ${data}`);
    });

    socket.on('update', function (state) {
      console.log(state);
      connectedPlayers.innerHTML = '';
      cards.innerHTML = '';
      deck.innerHTML = '';
      burned.innerHTML = '';
      played.innerHTML = '';

      state.players.forEach(player => {
        connectedPlayers.innerHTML += `<li>${player}</li>`;
      });
      state.cards.forEach(card => {
        cards.innerHTML += `<input type=radio name="cards" id="${card}" value="${card}"/><label for="${card}">${card}</label>`;
      });
      state.deck.forEach(card => {
        deck.innerHTML += `<li>${card}</li>`;
      });
      state.burned.forEach(card => {
        burned.innerHTML += `<li>${card}</li>`;
      });
      state.played.forEach(card => {
        played.innerHTML += `<li>${card}</li>`;
      });
    });
  },
};

export default view;
