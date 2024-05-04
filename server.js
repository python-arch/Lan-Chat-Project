// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');




app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg,username) => {
        io.emit('chat message', msg,username); // Broadcast message to all connected clients
        console.log('message sent');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('user joined', (message) => {
       io.emit('user joined', message); // Broadcast message to all connected clients
    });

});



server.listen(3000, () => {
    console.log('Server running on port 3000');
});
