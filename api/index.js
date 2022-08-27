// const app = require('../server');
const db = require('../configs/connection');
const express = require('express');
const routes = require('./router');
const path = require('path');

const { v4 } = require('uuid');

const app = express();

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.use(express.static(path.join(__dirname, 'public', 'html')));
// app.use(express.static('public'));

app.use('/', routes);

module.exports = app;

const PORT = process.env.PORT || 3000;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
