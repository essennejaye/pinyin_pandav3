const app = require('./server');
// const config = require('./configs/configDomain');
const db = require('./configs/connection');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
