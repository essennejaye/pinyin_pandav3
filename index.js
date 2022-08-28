const db = require('./configs/connection');
const express = require('express');
// const routes = require('./router');
const path = require('path');

const app = express();

// app.use(express.static(path.join(__dirname, 'public', 'html')));
// app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/api/test-endpoint', (req, res) => {
  res.status(200).json({ id: 1, text: 'Test Endpoint Description' });
});

// app.use('/api/', routes);

// db.once('open', () => {
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
// });

module.exports = app;
