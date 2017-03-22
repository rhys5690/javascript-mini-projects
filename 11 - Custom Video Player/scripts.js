// get our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full-screen');
const body = document.querySelector('body');
console.log(player.clientWidth);
console.log(player.clientHeight);
console.log(body.clientWidth);

//Build our functions

function play() {

  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip); //parseFloat returns a number
}

function changeVolume() {

  video[this.name] = this.value;
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function changeProgressBar(e) {
  const time = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = time;
}

function makeFullScreen() {
  // const ratio = player.clientWidth / player.clientHeight;

  const newWidth = body.clientWidth;
  const newHeight = body.clientHeight;

  player.clientWidth = newWidth;
  player.clientHeight = 0.5 * newWidth;
}

//Hook up the event listeners

video.addEventListener("click", play);
toggle.addEventListener("click", play);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(slider => slider.addEventListener("change", changeVolume));
video.addEventListener("timeupdate", updateProgress);

let mouseDown = false;

progress.addEventListener("mousemove", (e) => mouseDown && changeProgressBar(e));
progress.addEventListener("click", changeProgressBar);
progress.addEventListener("mousedown", () => mouseDown = true);
progress.addEventListener("mouseup", () => mouseDown = false);
fullScreen.addEventListener("click", makeFullScreen);
