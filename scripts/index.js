// Array of roing names
const roingNames = [
  "roingo",
  "roing",
  "rangus",
  "ringo",
  "rango",
  "roingOS",
  "roingy",
  "ron",
  "rongy",
  "roingie",
  "r",
  "rangoon",
  "roingusa",
];

const vowels = ["a", "e", "i", "o", "u"];

// Retrieve roingusCount and time from localStorage or set them to 0
let roingusCount = localStorage.getItem("roingusCount") || 0;
roingusCount = +roingusCount;

let time = localStorage.getItem("time") || 0;
time = +time;

// TODO: add dark mode to local storage
let darkmode = localStorage.getItem("darkMode") || false;

// Check if user has visited site before
const hasVisitedSite = localStorage.getItem;

// DOM elements
const roingus = document.querySelector("#roingus");
const timeElm = document.querySelector("#time");
const countElm = document.querySelector("#count");

// Audio elements
const grabAudio = new Audio("/assets/audio/grab.mp3");
const releaseAudio = new Audio("/assets/audio/release.mp3");
grabAudio.volume = 0.15;
releaseAudio.volume = 0.15;

let audioCount = 0;
const maxAudios = 8;

let clicked = false;

// Set count function
function setCount() {
  if (roingusCount === 25) {
    countElm.classList.add("animate-up");
  }

  if (roingusCount < 25) return;

  let roingus = roingName();
  countElm.innerHTML = `you have clicked ${roingus} ${roingusCount} times :)`;
}

// Set time function
function setTime() {
  if (time === 90) {
    timeElm.classList.add("animate-down");
  }
  if (time < 90) return;

  let roingus = roingName();
  timeElm.innerHTML = `you have observed ${roingus} for <br> ${convertSeconds(
    time
  )}`;

}

// Function to convert seconds to string
function convertSeconds(seconds) {
  const timeUnits = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  let remainingSeconds = seconds;

  return Object.entries(timeUnits)
    .reduce((result, [unit, value]) => {
      const unitValue = Math.floor(remainingSeconds / value);
      remainingSeconds -= unitValue * value;

      return unitValue > 0
        ? result + `${unitValue} ${unit}${unitValue !== 1 ? "s" : ""}, `
        : result;
    }, "")
    .slice(0, -2);
}

// random roingus name
function roingName() {
  let rand = Math.random();
  if (rand < 0.04) {
    return roingNames[Math.floor(Math.random() * roingNames.length)];
  } else if (rand < 0.06) {
    return (
      "roing" +
      vowels[Math.floor(Math.random() * vowels.length)] +
      vowels[Math.floor(Math.random() * vowels.length)]
    );
  }
  return "roingus";
}

// Check roingusCount and time on page load
if (roingusCount > 0) {
  setCount();
  clicked = false;
}

if (time > 0) {
  setTime();
}

// Play audio function
function play(audio) {
  if (audioCount < maxAudios) {
    audioCount++;
    let tmp = audio.cloneNode();
    tmp.addEventListener("ended", (e) => {
      audioCount--;
    });
    tmp.volume = 0.1;
    tmp.play();
  }
}

// Event listeners
roingus.addEventListener("pointerdown", (e) => {
  if (e.button !== 0) return;
  clicked = true;
  roingusCount += 1;
  setCount();
  play(grabAudio);
});

document.addEventListener("pointerup", () => {
  if (!clicked) return;

  play(releaseAudio);
  clicked = false;
});

// Increment time and set time interval
function tick() {
  if (document.hasFocus()) {
    time++;
    setTime();
  }
}

setInterval(tick, 1000);

// Save roingusCount and time to localStorage when the page is unloaded and every 10 seconds
function setStorage() {
  localStorage.setItem("roingusCount", roingusCount.toString());
  localStorage.setItem("time", time.toString());
}

addEventListener("unload", setStorage);
setInterval(setStorage, 10000);

// On click of click count or time, they'll reset counts back to 0
countElm.addEventListener("click", () => {
  roingusCount = 0;
  setStorage();
  setCount();
  countElm.innerHTML = "&nbsp;";
  countElm.classList.remove("animate-up");
});

timeElm.addEventListener("click", () => {
  time = 0;
  setStorage();
  setTime();
  timeElm.innerHTML = "&nbsp;";
  timeElm.classList.remove("animate-down");
});
