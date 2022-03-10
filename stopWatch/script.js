const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const continueBtn = document.querySelector(".continueBtn");
const restartBtn = document.querySelector(".restartBtn");

const stopWatch = document.querySelector(".stopWatch");
const milis = document.querySelector(".milis");

stopWatch.textContent = "00 : 00 : 00";

let ms = 0,
  seconds = 0,
  minutes = 0,
  hours = 0;

const startTime = () => {
  ms++;
  if (ms === 1000) {
    ms = 0;
    seconds += 1;
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
      if (minutes === 60) {
        minutes = 0;
        hours += 1;
      }
    }
  }
  let msText;
  if (ms < 10) {
    msText = "000" + ms;
  } else if (ms < 100) {
    msText = "00" + ms;
  } else if (ms < 1000) {
    msText = "0" + ms;
  } else {
    msText = ms;
  }
  let secondsText = seconds < 10 ? "0" + seconds : seconds;
  let minutesText = minutes < 10 ? "0" + minutes : minutes;
  let hoursText = hours < 10 ? "0" + hours : hours;
  stopWatch.textContent = `${hoursText} : ${minutesText} : ${secondsText}`;
  milis.textContent = msText;
};

let intervalId;
startBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = setInterval(startTime, 1);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(intervalId);
});

continueBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = setInterval(startTime, 1);
});

restartBtn.addEventListener("click", () => {
  (seconds = 0), (minutes = 0), (hours = 0), (ms = 0);
  clearInterval(intervalId);
  intervalId = setInterval(startTime, 1);
});
