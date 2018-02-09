let gameId;
const view = {
  init: (socket) => {
    const component = document.querySelector('[data-component="game-container"]');

    if (!component) { return; }

    const startGame = component.querySelector('[data-component-bind="start-game"]');
    const username = component.querySelector('[data-component-bind="username"]');
    const playerList = component.querySelector('[data-component-bind="player-list"]');
    const cards = component.querySelector('[data-component-bind="player-cards"]');
    const playCard = document.querySelector('[data-component-bind="play-card"]');
    const room = component.querySelector('.room');
    const deck = component.querySelector('.deck');
    const burned = component.querySelector('.burned');
    const played = component.querySelector('.played');

    socket.on('socketID', function (data) {
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

      if (state.player.leader) {
        startGame.style.display = 'block';
      }

      if (state.gameStarted) {
        startGame.style.display = 'none';
      }

      if (state.playersTurn === true) {
        playCard.style.display = 'block';
      }

      state.playerNames.forEach(player => {
        playerList.innerHTML += `<input type=radio name="players" id="${player}" value="${player}"/><label for="${player}">${player}</label>`;
      });
      state.player.cards.forEach((card, index) => {
        const reference = `${card}_${index}`;
        cards.innerHTML += `<input type=radio name="cards" id="${reference}" value="${card}"/><label for="${reference}">${card}</label>`;
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
