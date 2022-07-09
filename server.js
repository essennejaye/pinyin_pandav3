const express = require('express');
const routes = require('./router');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public', 'html')));
app.use(express.static('public'));

app.use('/', routes);

module.exports = app;
