require('dotenv').config();
const db = require('./configs/connection');
const express = require('express');
const Dictionary = require('./models/Dictionary');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

if (process.NODE_ENV === 'test') {
  app.use(express.static(path.join(__dirname, 'public', 'html')));
  app.use(express.static('public'));
}

app.get('/api/dictionary', (req, res) => {
  Dictionary.aggregate([{ $sample: { size: 500 } }], function (err, results) {
    try {
      res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

db.once('open', () => {
  if (process.NODE_ENV === 'test') {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  }
});

module.exports = app;
