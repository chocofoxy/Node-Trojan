const io = require('socket.io-client');
const { exit } = require('process');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    socket.emit('order', { module : 'command' , option : 1 } , () => exit() );
    //socket.emit('order', { module : 'command' , option : 2  } , () => exit() );
});
