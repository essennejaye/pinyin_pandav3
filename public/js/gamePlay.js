import { getListItemsData } from './createDb.js';

const wordInput = document.getElementById('word');
const newWord = document.getElementById('next-btn');
let olEle = document.getElementById('answers');

newWord.addEventListener('click', getInputAndAnswer);

let correctAnswer;

async function getInputAndAnswer() {
  let data = await getListItemsData();
  let rowIndex = Math.floor(Math.random() * data.length);
  let randomRow = data[rowIndex];
  wordInput.value = randomRow['pinyin'];
  correctAnswer = randomRow.english.join(', ');
  document.querySelector('ol').replaceChildren(...getAnswerList(data));
  olEle.addEventListener('click', checkAnswer);
}

function getListItems(text, index) {
  const p = document.createElement('p');
  p.append(`${index}.   ${text}`);
  const li = document.createElement('li');
  li.append(p);
  if (text === correctAnswer) {
    li.setAttribute('isCorrect', true);
  } else {
    li.setAttribute('isCorrect', false);
  }
  return li;
}

function getAnswerList(data) {
  let liElementsArrays = data.map(({ english }) => english);
  let liElements = liElementsArrays.map((array) => array.join(', '));
  return liElements.map((item, index) => getListItems(item, index + 1));
}

function checkAnswer(event) {
  let selectedAnswer = event.target.getAttribute('isCorrect');
  event.target.classList.add('noHover');
  if (selectedAnswer == 'true') {
    event.target.classList.add('correct-answer');
  } else {
    event.target.classList.add('incorrect-answer');
    var match = olEle.querySelectorAll("li[isCorrect='true']");
    if (match.length) {
      match[0].classList.add('actual-answer', 'noHover');
    } else {
      return 0;
    }
  }
  olEle.removeEventListener('click', checkAnswer);
}
