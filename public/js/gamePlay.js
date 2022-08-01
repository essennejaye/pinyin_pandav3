const wordInput = document.getElementById('word');
const newWord = document.getElementById('next-btn');
let olEle = document.getElementById('answers');

newWord.addEventListener('click', getNewWord);

let correctAnswer;

function getNewWord() {
  fetch('/dict_entries')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      getInputAndAnswer(data);
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation: ',
        error
      );
    });
}

function getInputAndAnswer(data) {
  let rowIndex = Math.floor(Math.random() * data.length);
  let randomRow = data[rowIndex];
  wordInput.value = randomRow.pinyin;
  correctAnswer = randomRow.english;
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
  let liElements = data.map(({ english }) => english);
  return liElements.map((item, index) => getListItems(item, index + 1));
}

function checkAnswer(event) {
  let selectedAnswer = event.target.getAttribute('isCorrect');
  console.log(event.target);
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
