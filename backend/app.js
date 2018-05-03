var express = require('express');
var socket = require('socket.io');
var app = express();


server = app.listen(8080, function() {
    console.log('server is running on 8080')
})

io = socket(server);

io.on('connection', (socket) => {
    console.log('socketID', socket.id);
    socket.on('CREATE_ROOM', function(data) {
        console.log('create room')
        socket.join('chatUp:' + data.userID)
        console.log('roomname', 'chatUp:' + data.userID);

    })
    socket.on('JOIN_ROOM', function(data) {
        console.log('join room')
        socket.join('chatUp:' + data.userID)
        console.log('roomname', 'chatUp:' + data.userID);

    })
    socket.on('LEAVE_ROOM', function(data) {
        console.log('leave room')
        socket.leave('chatUp:' + data.userID)
        console.log('leave roomname', 'chatUp:' + data.userID);
    })
    socket.on('SEND_MESSAGE', function(data) {
        console.log('send message to room', data.receiver, 'sender', data.message.sender.name)
        socket.to('chatUp:' + data.receiver).emit('RECEIVE_MESSAGE', data.message)
    })
});