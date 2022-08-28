// const db = require('./configs/connection');
const express = require('express');
// const route = require('./routes/dictionary');
// const path = require('path');

const app = express();

// app.use(express.static(path.join(__dirname, 'public', 'html')));
// app.use(express.static('public'));

// const PORT = process.env.PORT || 3000;

// app.use('/api/', route);

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
//   });
// });

module.exports = app;
