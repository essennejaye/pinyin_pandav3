const db = require('./configs/connection');
const express = require('express');

const app = express();

app.get('/api/dictionary', (req, res) => {
  res.status(200).json({ id: 1, text: 'Test Endpoint Description' });
});

const PORT = process.env.PORT || 3000;

db.once('open', () => {});

module.exports = app;

// const db = require('./configs/connection');
// require('dotenv').config();
// const express = require('express');
// const Dictionary = require('./models/Dictionary');
// const path = require('path');

// const app = express();

// const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'public', 'html')));
// app.use(express.static('public'));

// // app.get('/api/dictionary', (req, res) => {
// //   res.status(200).json({ id: 1, text: 'Test Endpoint Description' });
// // });

// app.get('/api/dictionary', (req, res) => {
//   Dictionary.aggregate([{ $sample: { size: 500 } }], function (err, results) {
//     try {
//       res.send(results);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });
// });

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
//   });
// });

// module.exports = app;
