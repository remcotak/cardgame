import styles from '../css/styles.css';

const socket = io();
const drawCard = document.querySelector('[data-component="draw-card"]');
const cards = document.querySelector('.cards');
const deck = document.querySelector('.deck');

drawCard.addEventListener('click', function () {
  console.log('clicked');
  socket.emit('draw-card');
});

socket.on('socketID', function (data) {
  console.log(data);
});

socket.on('update', function (state) {
  console.log(state);
  cards.innerHTML = '';
  deck.innerHTML = '';

  state.deck.forEach(card => {
    deck.innerHTML += `<li>${card}</li>`;
  });
  state.cards.forEach(card => {
    cards.innerHTML += `<li>${card}</li>`;
  });
})
