const wordInput = document.getElementById('word');
const newWord = document.getElementById('next-btn');
let olEle = document.getElementById('answers');

newWord.addEventListener('click', getNewWord);

let correctAnswer;

function getNewWord() {
  clearListElements();
  fetch('/dict_entries')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      createPossibleAnswers(data);
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation: ',
        error
      );
    });
}

function clearListElements() {
  while (olEle.hasChildNodes()) {
    olEle.removeChild(olEle.lastChild);
  }
}

function createPossibleAnswers(data) {
  let rowIndex = Math.floor(Math.random() * data.length);
  let randomRow = data[rowIndex];
  wordInput.value = randomRow.pinyin;
  correctAnswer = randomRow.english;
  olEle.addEventListener('click', checkAnswer);
  for (i = 0; i < data.length; i++) {
    let listEle = document.createElement('li');
    listEle.setAttribute('id', 'answer');
    // listEle.addEventListener('click', checkAnswer);
    listEle.append(document.createTextNode(data[i].english));
    olEle.appendChild(listEle);
  }
}

function checkAnswer(event) {
  let selectedAnswer = event.target.innerHTML;
  if (selectedAnswer === correctAnswer) {
    event.target.style.backgroundColor = 'rgba(42, 117, 50, 0.4)';
  } else {
    event.target.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
  }
  olEle.removeEventListener('click', checkAnswer);
}
