const app = require('./server');
const config = require('./configs/configDomain');

app.listen(config.port, () => {
  console.log(`Server listening on ${config.port}`);
});
