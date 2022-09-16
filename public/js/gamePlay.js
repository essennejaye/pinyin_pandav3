import { getListItemsData } from './createDb.js';

const wordInput = document.getElementById('word');
const newWord = document.getElementById('next-btn');
let btnAnswerDiv = document.getElementById('btn-answers');

newWord.addEventListener('click', getInputAndAnswer);

let correctAnswer;

async function getInputAndAnswer() {
  let data = await getListItemsData();
  let rowIndex = Math.floor(Math.random() * data.length);
  let randomRow = data[rowIndex];
  wordInput.value = randomRow['pinyin'];
  correctAnswer = randomRow.english.join(', ');
  getAnswerBtns(data);
}

function getBtnItems(text, index) {
  const btnAnswer = document.createElement('button');
  btnAnswer.classList.add('btn-answer');
  const answerSpan = document.createElement('span');
  answerSpan.classList.add('answer-txt');
  answerSpan.setAttribute('id', `answer-txt${index}`);
  answerSpan.append(`${index}. ${text}`);
  if (text === correctAnswer) {
    answerSpan.setAttribute('isCorrect', true);
  } else {
    answerSpan.setAttribute('isCorrect', false);
  }
  btnAnswer.append(answerSpan);
  return btnAnswer;
}

function getAnswerBtns(data) {
  let btnAnswerElementsArrays = data.map(({ english }) => english);
  let btnAnswerElements = btnAnswerElementsArrays.map((array) =>
    array.join(', ')
  );
  let textNodes = btnAnswerElements.map((item, index) =>
    getBtnItems(item, index + 1)
  );
  btnAnswerDiv.replaceChildren(...textNodes);
  btnAnswerDiv.addEventListener('click', checkAnswer);
  return getExpandBtn();
}

function getExpandBtn() {
  let i;
  const answerSpanElement = document.querySelectorAll('.answer-txt');
  const btnContainerElement = document.querySelectorAll('.btn-answer');
  for (i = 0; i < answerSpanElement.length; i++) {
    const answerWidth = answerSpanElement[i].scrollWidth;
    const btnContainerWidth = btnContainerElement[i].clientWidth;
    console.log(`The answer text at index ${i} is ${answerWidth} px wide`);
    console.log(
      `The button container at index ${i} is ${btnContainerWidth} px wide`
    );
    if (answerWidth > btnContainerWidth) {
      const btnAnswerExpand = document.createElement('button');
      btnAnswerExpand.classList.add('overflow-btn');
      btnAnswerExpand.innerHTML = 'See More';
      // let oldNode = document.querySelector('answer-txt' + i)
      // oldNode.appendChild(btnAnswerExpand)
      btnAnswerExpand.addEventListener('click', showExpandedText);
      btnContainerElement[i].appendChild(btnAnswerExpand);
      btnAnswerDiv.replaceChild(
        btnContainerElement[i],
        btnAnswerDiv.childNodes[i]
      );
    }
  }
}

function checkAnswer(event) {
  console.log(event.target);
  let selectedAnswer = event.target.getAttribute('isCorrect');
  event.target.classList.add('noHover');
  if (selectedAnswer == 'true') {
    event.target.classList.add('correct-answer');
  } else {
    event.target.classList.add('incorrect-answer');
    var match = btnAnswerDiv.querySelectorAll("span[isCorrect='true']");
    if (match.length) {
      match[0].classList.add('actual-answer', 'noHover');
    } else {
      return 0;
    }
  }
  btnAnswerDiv.removeEventListener('click', checkAnswer);
}

function showExpandedText(e) {
  e.stopPropagation();
  let showText = e.target;
  showText.classList.add('answer-txtShow');
  console.log('To Do');
}
