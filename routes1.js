const express = require('express');
const path = require('path');
const api = express.Router();

api.use(express.static(path.join(__dirname, 'public', 'html')));
api.use(express.static('public'));

api.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

module.exports = api;
