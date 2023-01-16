const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector(`body`);
const intervalTime = 1000;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

startBtn.addEventListener(`click`, onGenerationColor);
stopBtn.addEventListener(`click`, offGenerationColor);

function onGenerationColor() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, intervalTime);
    
}

function offGenerationColor() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
}