/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
let mousedown = false;

/* Build out functions */
let togglePlay = () => video[video.paused ? "play" : "pause"]();
let updateButton = (e) => (toggle.textContent = e.target.paused ? "►" : "❚ ❚");
let scrub = (e) => (video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration);
let handleProgress = () => (progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`);
let skip = (e) => (video.currentTime = video.currentTime + parseFloat(e.target.dataset.skip));
let handleRangeUpdate = (e) => (video[e.target.name] = e.target.value);

/* Hook up the event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) => range.addEventListener("mousemove", handleRangeUpdate));
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
