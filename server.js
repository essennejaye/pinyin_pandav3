const express = require('express');
const path = require('path');
const { readFile, getRandomWord } = require('./retrieveWordFile');
const LanguageWords = require('./models/languageWords');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public', 'html')));
app.use(express.static('public'));

app.get('/api/getPinWord', (req, res) => {
  const languageFile = readFile();
  const randomWord = getRandomWord(languageFile);
  const pinyinEnglishWords = new LanguageWords(
    randomWord.pinyin,
    randomWord.english
  );
  res.json(pinyinEnglishWords);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
