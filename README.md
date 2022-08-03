# Pinyin Panda

- Pinyin Panda is a Mandarin Chinese language learning application. I developed the app to help practice pronunciation and to remember the English translations of Mandarin words and phrases.
- Mandarin Chinese syllables depend on inflection or tone to derive meaning. The tones in this application are represented as a number added to the end of a syllable.
- This app assumes the learner has some prior knowledge of Mandarin tones and basic pronunciation of initials and finals ( the fundamental elements in pinyin).
- The pinyin and the translations are retrieved from a MongoDB seeded from the [CC-CEDICT](https://cc-cedict.org/wiki/), an online, downloadable public-domain Chinese-English dictionary. CC-CEDICT is licensed under a [Creative Commons Attribution-Share Alike 3.0 License](https://creativecommons.org/licenses/by-sa/3.0/). Thanks to Franki Allegra whose [Python parser](https://github.com/rubber-duck-dragon/rubber-duck-dragon.github.io/blob/master/cc-cedict_parser/parser.py) was the basis for the JavaScript parser I used in my seeding program (that code is not part of this repo).
  [Pinyin Panda](https://pinyin-panda.herokuapp.com/) is available at https://pinyin-panda.herokuapp.com/. It was developed using HTML, CSS, and vanilla JavaScript. It uses an Express server on top of Node and Mongoose to query the MongoDB.

### How to Play

- The home page gives a brief description of the app. When the user hits the Play Now button, they are taken to the game play page.
![pinyin_panda_ss1](https://user-images.githubusercontent.com/26013167/182531031-0ecc5789-d698-44d2-9356-f4859a5445f2.png)

- The game play page gives brief instruction on how to play. When the user clicks the Get Word button a pinyin word or phrase replaces the PīnYīn placeholder, and 4 possible English translations are presented in a list.
  ![pinyin_panda_ss](https://user-images.githubusercontent.com/26013167/182531116-ffe2084a-fc95-4ee7-806f-6397aec3cef4.png)

- When the user chooses the correct answer, the background of the selected answer is highlighted in green. If the user chooses the incorrect answer, the background of the selected answer is highlighted in red, and the correct answer is highlighted with a green border.
  ![pinyin_panda_ss2](https://user-images.githubusercontent.com/26013167/182531152-52cd2156-70d5-48c2-a1ac-f8b919d9ebec.png)
  ![pinyin_panda_ss3](https://user-images.githubusercontent.com/26013167/182531159-4a6b7cf1-8727-4343-8c62-1dec0e4dad23.png)

- The user may continue to get new words or phrases with possible translations if desired.
- When the user clicks the End Game button, they are returned to the home page.


