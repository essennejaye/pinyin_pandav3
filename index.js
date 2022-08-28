// const app = require('../server');
const db = require('./configs/connection');
const express = require('express');
const routes = require('./router');
const path = require('path');

const { v4 } = require('uuid');

const app = express();

// app.use(express.static(path.join(__dirname, 'public', 'html')));
// app.use(express.static('public'));

app.use('/', routes);

const PORT = process.env.PORT || 3000;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});

module.exports = app;
