const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

let startTime;
let elapsedTime = 0;
let intervalId = null;
let animationFrameId = null; // Keep track of requestAnimationFrame

startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);

function start() {
  if (!intervalId) {
    startTime = Date.now();
    animationFrameId = requestAnimationFrame(updateTime); // Use requestAnimationFrame
  }
}

function pause() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId); // Cancel requestAnimationFrame
    animationFrameId = null;
    intervalId = null;
  }
}

function reset() {
  cancelAnimationFrame(animationFrameId); // Cancel requestAnimationFrame
  animationFrameId = null;
  intervalId = null;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.000";
}

function updateTime() {
  animationFrameId = requestAnimationFrame(updateTime); // Schedule the next update

  elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  timeDisplay.textContent = formattedTime;
}

function formatTime(timeInMilliseconds) {
  const hours = Math.floor(timeInMilliseconds / 3600000);
  const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
  const milliseconds = Math.floor(timeInMilliseconds % 1000);

  return `${padZeroes(hours, 2)}:${padZeroes(minutes, 2)}:${padZeroes(
    seconds,
    2
  )}.${padZeroes(milliseconds, 3)}`;
}

function padZeroes(number, digits) {
  return number.toString().padStart(digits, "0");
}
