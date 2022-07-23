const app = require('./server');
const config = require('./configs/configDomain');
const db = require('./configs/connection');

db.once('open', () => {
  app.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`);
  });
});
