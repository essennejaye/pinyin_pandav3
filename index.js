const appServer = require('./app_server');
const dataServer = require('./data_server');
const config = require('./configs/configDomain');
const config2 = require('./configs/configDomain2');

appServer.listen(config.port, () => {
  console.log(`App server listening on ${config.port}`);
});

dataServer.listen(config2.port, () => {
  console.log(`Data server listening on ${config2.port}`);
});
