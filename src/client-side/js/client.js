import styles from '../css/styles.css';
import events from './game/events';
import view from './game/view';

// Init socket
const socket = io();

const gamePrompt = document.querySelector('[data-component="game-prompt"]');
const username = gamePrompt.querySelector('[data-component-bind="username"]');
const newGame = gamePrompt.querySelector('[data-component-bind="new-game"]');
const joinGame = gamePrompt.querySelector('[data-component-bind="join-game"]');
const gameIdInput = gamePrompt.querySelector('[data-component-bind="game-id"]');
const connectError = gamePrompt.querySelector('[data-component-bind="connect-error"]');
const gameContainer = document.querySelector('[data-component="game-container"]');

newGame.addEventListener('click', function () {
  if (!username.value) {
    username.classList.add('error');
    return;
  }
  socket.emit('new-game',
    {
      name: username.value
    },
    function (data) {
      // set gameId variable
      setGameId(data.gameId);
      gamePrompt.style.display = 'none';
      gameContainer.style.display = 'block';
    })
});

joinGame.addEventListener('click', function () {
  if (!username.value) {
    username.classList.add('error');
    return;
  }
  if (!gameIdInput.value) {
    gameIdInput.classList.add('error');
    return;
  }
  socket.emit('join-game',
    {
      name: username.value,
      gameId: gameIdInput.value
    },
    function (data) {
      // Show error message on error
      if (data && data.error) {
        connectError.innerHTML = data.error;
        return;
      }
      // set gameId variable
      setGameId(data.gameId);
      gamePrompt.style.display = 'none';
      gameContainer.style.display = 'block';
    }
  );
});

function setGameId(id) {
  events.setGameId(id);
  view.setGameId(id);
}

events.init(socket);
view.init(socket);
