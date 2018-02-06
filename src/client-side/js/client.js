import styles from '../css/styles.css';
import events from './game/events';
import view from './game/view';

// Init socket
const socket = io();

const gamePrompt = document.querySelector('[data-component="game-prompt"]');
const startGame = gamePrompt.querySelector('[data-component-bind="start-game"]');
const joinGame = gamePrompt.querySelector('[data-component-bind="join-game"]');
const username = gamePrompt.querySelector('[data-component-bind="username"]');
const gameContainer = document.querySelector('[data-component="game-container"]');

startGame.addEventListener('click', function () {
  console.log(username.value);
  socket.emit('start-game',
    { name: username.value },
    function (data) {
      gameContainer.style.display = 'block';
      console.log(data);
    });
});


events.init(socket);
view.init(socket);
