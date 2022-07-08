const express = require('express');
const routes = require('./routes1.js');

const app_server = express();

app_server.use('/', routes);

module.exports = app_server;

// const { readFile, getRandomWord } = require('./retrieveWordFile');
// const LanguageWords = require('./models/languageWords');

// app.get('/api/getPinWord', (req, res) => {
//   const languageFile = readFile();
//   const randomWord = getRandomWord(languageFile);
//   const pinyinEnglishWords = new LanguageWords(
//     randomWord.pinyin,
//     randomWord.english
//   );
//   res.json(pinyinEnglishWords);
// });
