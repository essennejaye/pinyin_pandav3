// (function pageInit() {
//   getWordInput();
// })();

let englishAnswer = '';

const newWord = document.getElementById('next-btn');
newWord.addEventListener('click', getWordInput);
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', checkAnswer);
const rightAnswer = document.getElementById('response');

function getWordInput() {
  fetch('/api/getPinWord')
    .then((response) => response.json())
    .then((data) => {
      const wordInput = document.getElementById('word');
      wordInput.value = data.pinyin;
      englishAnswer = data.english;
    });
}

function checkAnswer() {
  let answer = document.getElementById('answer').value;

  if (!answer) {
    alert('You must enter an English transation');
    return;
  }
  if (answer === englishAnswer) {
    rightAnswer.innerHTML = 'Correct';
  } else {
    rightAnswer.innerHTML = 'Incorrect';
  }
}
