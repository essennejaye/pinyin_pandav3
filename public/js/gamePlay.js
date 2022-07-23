const wordInput = document.getElementById('word');
const newWord = document.getElementById('next-btn');
newWord.addEventListener('click', getWordInput);
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', checkAnswer);

let englishAnswer = '';

function getWordInput() {
  fetch('/api/getWord')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then((data) => {
      wordInput.value = data.pinyin;
      englishAnswer = data.english;
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation: ',
        error
      );
    });
}

function checkAnswer() {
  if (!answer.value) {
    alert('You must enter an English transation');
    return;
  }
  if (answer.value.toLowerCase() === englishAnswer.toLowerCase()) {
    rightAnswer.innerHTML = 'Correct';
  } else {
    rightAnswer.innerHTML = 'Incorrect';
  }
}
