import Path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

import Express from 'express';
import * as Http from 'http';
import { Server } from 'socket.io';

const app = Express();
const server = Http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
    console.log('A user connected!');

    socket.on('disconnect', () => {
        console.log('A user disconnected!');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});