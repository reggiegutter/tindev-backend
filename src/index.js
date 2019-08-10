const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const server = express();

mongoose.connect(
  'mongodb+srv://tindev-reggie:kQCGPUxPPLfCil6y@cluster0-ya05w.gcp.mongodb.net/tindev?retryWrites=true&w=majority',
  { useNewUrlParser: true },
);

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
