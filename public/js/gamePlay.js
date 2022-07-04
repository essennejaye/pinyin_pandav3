(function pageInit() {
  const blankInput = document.getElementById('word');
  blankInput.addEventListener('click', getWordInput);
})();

function getWordInput(e) {
  e.preventDefault();
  fetch('/api/getPinWord')
    .then((response) => response.json())
    .then((data) => {
      const wordInput = document.getElementById('word');
      wordInput.value = data.pinyin;
    });
}
