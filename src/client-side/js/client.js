import styles from '../css/styles.css';

const socket = io();
const startGame = document.querySelector('[data-component="start-game"]');
const drawCard = document.querySelector('[data-component="draw-card"]');
const playCard = document.querySelector('[data-component="play-card"]');
const socketId = document.querySelector('.socket-id');
const connectedPlayers = document.querySelector('.connected');
const cards = document.querySelector('.cards');
const deck = document.querySelector('.deck');
const burned = document.querySelector('.burned');
const played = document.querySelector('.played');

startGame.addEventListener('click', function () {
  socket.emit('start-game');
});

drawCard.addEventListener('click', function () {
  console.log('clicked draw');
  socket.emit('draw-card');
});

playCard.addEventListener('click', function () {
  const card = cards.querySelector('input[name="cards"]:checked').value;
  console.log('play card: ', card);
  socket.emit('play-card', card);
});

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
