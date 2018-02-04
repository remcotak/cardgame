import styles from '../css/styles.css';

const socket = io();
const drawCard = document.querySelector('[data-component="draw-card"]');
const cards = document.querySelector('.cards');

drawCard.addEventListener('click', function () {
  console.log('clicked');
  socket.emit('draw-card');
});

socket.on('socketID', function (data) {
  console.log(data);
});

socket.on('update', function (state) {
  console.log(state);
  state.forEach(card => {
    cards.innerHTML = card;
  });
})
