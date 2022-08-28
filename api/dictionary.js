const express = require('express');
const app = express();

const route = require('../routes/dictionary');
app.use('/api/', route);

module.exports = app;
