// // const db = require('./configs/connection');
// const express = require('express');
// const route = require('./routes/dictionary');
// // const path = require('path');

// const app = express();

// // app.use(express.static(path.join(__dirname, 'public', 'html')));
// // app.use(express.static('public'));

// const PORT = process.env.PORT || 3000;

// // app.use('/api/', route);

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
//   });
// });

// module.exports = app;

const db = require('./configs/connection');
require('dotenv').config();
const express = require('express');
const Dictionary = require('../models/Dictionary');

const app = express();

const PORT = process.env.PORT || 3000;

// app.get('/api/dictionary', (req, res) => {
//   res.status(200).json({ id: 1, text: 'Test Endpoint Description' });
// });

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
    console.log(`Server listening on ${PORT}`);
  });
});

module.exports = app;
