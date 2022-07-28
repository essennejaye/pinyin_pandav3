const app = require('./server');
const db = require('./configs/connection');

const PORT = process.env.PORT || 3000;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
