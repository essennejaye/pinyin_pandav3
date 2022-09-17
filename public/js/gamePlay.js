import { getListItemsData } from './createDb.js';

window.addEventListener('resize', addRemoveExpandBtns);

const wordInput = document.getElementById('word');
const newWord = document.getElementById('next-btn');
newWord.addEventListener('click', getInputAndAnswer);
let btnAnswerDiv = document.getElementById('btn-answers');

let correctAnswer;

async function getInputAndAnswer() {
  let data = await getListItemsData();
  let rowIndex = Math.floor(Math.random() * data.length);
  let randomRow = data[rowIndex];
  wordInput.value = randomRow['pinyin'];
  correctAnswer = randomRow.english.join(', ');
  getAnswerBtns(data);
}

function getAnswerBtns(data) {
  let answerSpanElementsArrays = data.map(({ english }) => english);
  let answerSpanElements = answerSpanElementsArrays.map((array) =>
    array.join(', ')
  );
  let answerSpanNodes = answerSpanElements.map((item, index) =>
    getBtnItems(item, index + 1)
  );
  btnAnswerDiv.replaceChildren(...answerSpanNodes);
  btnAnswerDiv.addEventListener('click', checkAnswer);
  return getExpandBtns();
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

function getExpandBtns() {
  let i;
  const answerSpanElement = document.querySelectorAll('.answer-txt');
  const btnContainerElement = document.querySelectorAll('.btn-answer');
  for (i = 0; i < answerSpanElement.length; i++) {
    if (answerSpanElement[i].offsetWidth < answerSpanElement[i].scrollWidth) {
      const btnAnswerExpand = document.createElement('button');
      btnAnswerExpand.classList.add('overflow-btn');
      btnAnswerExpand.innerHTML = 'See More';
      btnAnswerExpand.addEventListener('click', toggleExpandedText);
      btnContainerElement[i].appendChild(btnAnswerExpand);
      btnAnswerDiv.replaceChild(
        btnContainerElement[i],
        btnAnswerDiv.childNodes[i]
      );
    }
  }
  return btnAnswerDiv;
}

function addRemoveExpandBtns() {
  const btnContainerElement = document.querySelectorAll('.btn-answer');
  for (let i = 0; i < btnContainerElement.length; i++) {
    let tagEle = btnContainerElement[i].lastChild;
    // console.log(`the last child of this button answer is ${tagEle.tagName}`);
    if (tagEle && tagEle.tagName === 'BUTTON') {
      btnContainerElement[i].removeChild(tagEle);
    }
  }
  getExpandBtns();
}

function checkAnswer(event) {
  let selectedAnswer = event.target.getAttribute('isCorrect');
  event.target.classList.add('noHover');
  if (selectedAnswer == 'true') {
    event.target.parentNode.classList.add('correct-answer');
  } else {
    event.target.parentNode.classList.add('incorrect-answer');
    var match = btnAnswerDiv.querySelectorAll("span[isCorrect='true']");
    if (match.length) {
      match[0].parentNode.classList.add('actual-answer', 'noHover');
    } else {
      return 0;
    }
  }
  btnAnswerDiv.removeEventListener('click', checkAnswer);
}

function toggleExpandedText(e) {
  e.stopPropagation();
  let element = e.target.previousSibling;
  let elementParent = e.target.parentNode;
  element.classList.toggle('answer-txtShow');
  elementParent.classList.toggle('btn-answerShow');
  return;
}
