require('dotenv').config();
const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const LanguageWords = require('./models/languageWords');
const Dictionary = require('./models/Dictionary');

const router = express.Router();

// router.get('/api/getWord', async (req, res) => {
//   try {
//     const doc = new GoogleSpreadsheet(
//       '1nXxK9Xjg6Wuif700IF7Z4tbK_QBwiZgZQ543R0mPTU0'
//     );
//     doc.useApiKey(process.env.API_KEY);
//     await doc.loadInfo();
//     const sheet = doc.sheetsByIndex[0];
//     const rows = await sheet.getRows();
//     let rowIndex = Math.floor(Math.random() * rows.length);
//     const randomRow = rows[rowIndex];
//     const randomWord = new LanguageWords(
//       randomRow.pinyin,
//       randomRow.english,
//       randomRow.characters
//     );
//     res.json(randomWord);
//     res.status(200);
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//   }
// });

router.get('/dict_entries', (req, res) => {
  Dictionary.aggregate([{ $sample: { size: 4 } }], function (err, results) {
    try {
      res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
