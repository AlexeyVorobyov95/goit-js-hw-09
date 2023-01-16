import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.disabled = true;
let userDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      startBtn.disabled = true;

      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;

      userDate = selectedDates[0];
    }
  },
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

class Timer {
  constructor() {
    this.isActive = false;
    startBtn.disabled = true;
  }
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    setInterval(() => {
      const currentTime = Date.now();
      // console.log(currentTime);
      const deltaTime = userDate - currentTime;
      const timeComponents = convertMs(deltaTime);
      days.textContent = timeComponents.days;
      hours.textContent = timeComponents.hours;
      seconds.textContent = timeComponents.seconds;
      minutes.textContent = timeComponents.minutes;
    }, 1000);
  }
}

startBtn.addEventListener(`click`, () => {
  timer.start();
});

const timer = new Timer();

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(inputDate, options);
