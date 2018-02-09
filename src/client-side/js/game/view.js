let gameId;
const view = {
  init: (socket) => {
    const component = document.querySelector('[data-component="game-container"]');

    if (!component) { return; }

    const username = component.querySelector('[data-component-bind="username"]');
    const room = component.querySelector('.room');
    const playerList = component.querySelector('[data-component-bind="player-list"]');
    const cards = component.querySelector('.cards');
    const deck = component.querySelector('.deck');
    const burned = component.querySelector('.burned');
    const played = component.querySelector('.played');
    const socketId = component.querySelector('.socket-id');

    socket.on('socketID', function (data) {
      socketId.innerHTML = data;
      console.log(`Connected with id: ${data}`);
    });

    socket.on('update', function (state) {
      console.log(state);
      username.innerHTML = '';
      room.innerHTML = '';
      playerList.innerHTML = '';
      cards.innerHTML = '';
      deck.innerHTML = '';
      burned.innerHTML = '';
      played.innerHTML = '';

      username.innerHTML = `${state.player.name}`;
      room.innerHTML = `Room: ${state.gameId}`;

      state.players.forEach(player => {
        playerList.innerHTML += `<li>${player}</li>`;
      });
      state.player.cards.forEach(card => {
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
  setGameId: (id) => {
    gameId = id;
  },
};

export default view;
