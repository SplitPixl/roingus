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
const darkmodeCheckbox = document.querySelector("#darkmode");

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
  clicked = true;

  if (roingusCount < 25) return;

  let roingus = "roingus";
  if (Math.random() > 0.92) {
    roingus = roingNames[Math.floor(Math.random() * roingNames.length)];
  }
  countElm.innerHTML = `you have clicked ${roingus} ${roingusCount} times :)`;
}

// Set time function
function setTime() {
  if (time < 90) return;

  let roingus = "roingus";
  if (Math.random() > 0.96) {
    roingus = roingNames[Math.floor(Math.random() * roingNames.length)];
  }
  timeElm.innerHTML = `you have observed ${roingus} for ${convertSeconds(
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
setInterval(() => {
  time++;
  setTime();
}, 1000);

// Save roingusCount and time to localStorage when the page is unloaded and every 10 seconds
function setStorage() {
  localStorage.setItem("roingusCount", roingusCount.toString());
  localStorage.setItem("time", time.toString());
}

addEventListener("unload", setStorage);
setInterval(setStorage, 10000);

// Dark mode functionality
const root = document.querySelector(":root");

darkmodeCheckbox.addEventListener("change", () => {
  if (darkmodeCheckbox.checked) {
    root.style.setProperty("--background-color", "#000000");
    root.style.setProperty("--text-color", "#FFFFFF");

    // Store "yes" and "no" values in darkMode to make it easier to discern 'false' from 'null' (javascript ew)
    localStorage.setItem("darkMode", "yes");
  } else {
    root.style.setProperty("--background-color", "#FFFFFF");
    root.style.setProperty("--text-color", "#000000");
    localStorage.setItem("darkMode", "no");
  }
});

// Determines the value of 'darkmode' based on the stored preference or the preferred color scheme,
// considering whether the user has visited the site before or not.
// If 'darkMode' is null (user hasn't visited before), 'darkmode' is set to the preferred color scheme.
// If 'darkMode' is 'yes' or 'no' (user has visited before), 'darkmode' is set to the stored value.
const storedDarkMode = localStorage.getItem("darkMode");
const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

if (storedDarkMode === "yes" || storedDarkMode === "no") {
  darkmode = storedDarkMode === "yes";
} else {
  darkmode = prefersDarkMode;
}

darkmodeCheckbox.checked = darkmode;
