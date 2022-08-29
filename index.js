require('dotenv').config();
const db = require('./configs/connection');
const express = require('express');
const Dictionary = require('./models/Dictionary');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

if (process.argv.includes('local')) {
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
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

module.exports = app;
