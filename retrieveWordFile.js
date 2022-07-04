const fs = require('fs');

function readFile() {
  const languageFileJson = fs.readFileSync('./languageFile.json', 'utf8');
  const languageFile = JSON.parse(languageFileJson);
  return languageFile;
}

function getRandomWord(languageFile) {
  let fileWordIndex = Math.floor(Math.random() * languageFile.words.length);
  const randomWord = languageFile.words[fileWordIndex];
  return randomWord;
}

module.exports = { readFile, getRandomWord };
