const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('A user connected:', socket.id);

  socket.on('send-poll', data => {
    console.log('Poll sent:', data);
    io.emit('new-poll', data); // broadcast to all students
  });

  socket.on('submit-vote', ({ option }) => {
    console.log('Vote received for:', option);
    io.emit('poll-response', { option });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
