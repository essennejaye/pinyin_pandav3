# Pinyin Panda

- Pinyin Panda is a Mandarin Chinese language learning application. I developed the app to help practice pronunciation and to remember the English translations of Mandarin words and phrases.
- Mandarin Chinese syllables depend on inflection or tone to derive meaning. The tones in this application are represented as a number added to the end of a syllable.
- This app assumes the learner has some prior knowledge of Mandarin tones and basic pronunciation of initials and finals ( the fundamental elements in pinyin).
- The pinyin and the translations are retrieved from a MongoDB seeded from the [CC-CEDICT](https://cc-cedict.org/wiki/), an online, downloadable public-domain Chinese-English dictionary. CC-CEDICT is licensed under a [Creative Commons Attribution-Share Alike 3.0 License](https://creativecommons.org/licenses/by-sa/3.0/). Thanks to Franki Allegra whose [Python parser](https://github.com/rubber-duck-dragon/rubber-duck-dragon.github.io/blob/master/cc-cedict_parser/parser.py) was the basis for the JavaScript parser I used in my seeding program (that code is not part of this repo).
  [Pinyin Panda](https://pinyin-panda.herokuapp.com/) is available at https://pinyin-panda.herokuapp.com/. It was developed using HTML, CSS, and vanilla JavaScript. It uses an Express server on top of Node and Mongoose to query the MongoDB.

### How to Play

- The home page gives a brief description of the app. When the user hits the Play Now button, they are taken to the game play page.

The game play page gives brief instruction on how to play. When the user clicks the get word button a pinyin word or phrase replaces the “PīnYīn” placeholder, and 4 possible English translations are presented in a list.
When the user chooses the correct answer, the background of the selected answer is highlighted in green. If the user chooses the incorrect answer, the background of the selected answer is highlighted in red, and the correct answer is highlighted with a green border.
The user may continue to get new words or phrases with possible translations if desired.
When the user clicks the End Game button, they are returned to the home page.
