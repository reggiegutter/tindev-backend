const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const io = require('socket.io');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const ioServer = io(server);

const connectedDevs = {};

ioServer.on('connection', (socket) => {
  const { dev } = socket.handshake.query;
  connectedDevs[dev] = socket.id;
});

mongoose.connect(
  'mongodb+srv://tindev-reggie:kQCGPUxPPLfCil6y@cluster0-ya05w.gcp.mongodb.net/tindev?retryWrites=true&w=majority',
  { useNewUrlParser: true },
);

app.use((req, res, next) => {
  req.io = ioServer;
  req.connectedDevs = connectedDevs;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
