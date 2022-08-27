require('dotenv').config();
const express = require('express');
const Dictionary = require('./models/Dictionary');

const router = express.Router();

router.get('/dict_entries', (req, res) => {
  Dictionary.aggregate([{ $sample: { size: 500 } }], function (err, results) {
    try {
      res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
