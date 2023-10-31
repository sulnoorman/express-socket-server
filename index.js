const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const { PORT } = require('./shared');

const app = express();
const server = http.createServer(app);
const appRouter = require('./router');

// define socket.i0
const io = new Server(server);

// import function to connect to mongodb
const { connect, getConnectedClient } = require('./db/db.js');

const router = express.Router();

// middleware app
app.use(cors());
app.use(express.static('public'));

// connecting to database
connect().then(() => {
    console.log('connect to database');
    app.get('/', (req, res) => [
        res.send('<h1>Selamat Datang</h1>')
    ]);

    app.use('/api', appRouter);

    io.on('connection', (socket) => {
        console.log('connect to socket io', socket.id);

        socket.on('connectError', (error) => {
            console.error('Socket error:', error);
        })

        socket.emit('message', { msg: 'Hello! You already connected to the socket io server' })

        socket.on('input', (data) => {
            io.emit('output', data);
        })
    })

})

server.listen(PORT, () => {
    console.log('server running succesfully on port ' + PORT + '!');
});