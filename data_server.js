const express = require('express');

const app1 = express();
const port = process.env.PORT || 3001;

app1.get('/', (req, res) => {
  res.send('Hello World');
});

app1.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
