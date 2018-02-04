import styles from '../css/styles.css';

const socket = io();
const drawCard = document.querySelector('[data-component="draw-card"]');

drawCard.addEventListener('click', function () {
  console.log('draw');
  socket.emit('drawCard', 'hallo');
});

socket.on('socketID', function (data) {
  console.log(data);
});
