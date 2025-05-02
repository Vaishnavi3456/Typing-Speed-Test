const quote = document.getElementById('quote').innerText;
const input = document.getElementById('input');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart');

let timer = 0;
let interval = null;
let started = false;

input.addEventListener('input', () => {
  if (!started) {
    started = true;
    interval = setInterval(() => {
      timer++;
      timerDisplay.textContent = timer;
    }, 1000);
  }

  const typed = input.value;
  const correctChars = [...typed].filter((char, i) => char === quote[i]).length;
  const accuracy = Math.round((correctChars / typed.length) * 100) || 100;
  const wordsTyped = typed.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / timer) * 60) || 0;

  accuracyDisplay.textContent = accuracy;
  wpmDisplay.textContent = wpm;

  if (typed.trim() === quote.trim()) {
    clearInterval(interval);
    input.disabled = true;
  }
});

restartBtn.addEventListener('click', () => {
  clearInterval(interval);
  timer = 0;
  started = false;
  timerDisplay.textContent = 0;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 100;
  input.value = '';
  input.disabled = false;
  input.focus();
});
