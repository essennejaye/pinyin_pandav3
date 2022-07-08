const express = require('express');
const routes = require('./routes2');

const data_server = express();

data_server.use('/', routes);

module.exports = data_server;
