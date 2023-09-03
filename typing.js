const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
const lvls = {
  Easy: 8,
  Normal: 6,
  Hard: 4,
};

let levelSelect = document.getElementById("levelSelect");
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
var defaultLevel = "Easy"; // Change this to your desired default level
levelSelect.value = defaultLevel;

// Retrieve the time limit for the default level
let defaultTimeLimit = lvls[defaultLevel];
lvlNameSpan.innerHTML = defaultLevel;
secondsSpan.innerHTML = defaultTimeLimit;
timeLeftSpan.innerHTML = defaultTimeLimit;

levelSelect.addEventListener("change", function () {
  let selectedLevel = levelSelect.value;
  let timeLimit = lvls[selectedLevel];
  if (timeLimit) {
    lvlNameSpan.innerHTML = selectedLevel;
    secondsSpan.innerHTML = timeLimit;
    timeLeftSpan.innerHTML = timeLimit;
  } else {
    console.log("Invalid level selected");
  }
});
scoreTotal.innerHTML = words.length;
input.onpaste = function () {
  return false;
};
startButton.onclick = function () {
  this.remove();
  input.focus();
  genWords();
  levelSelect.disabled = true;
};
function genWords() {
  let randomWords = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWords);
  words.splice(wordIndex, 1);
  theWord.innerHTML = randomWords;
  upcomingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    div = document.createElement("div");
    text = document.createTextNode(words[i]);
    div.appendChild(text);
    upcomingWords.appendChild(div);
  }
  startPlay();
}
function startPlay() {
  let selectedLevel = levelSelect.value;
  let timeLimit = lvls[selectedLevel];
  timeLeftSpan.innerHTML = timeLimit;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          spantext = document.createTextNode("Well Played");
          span.appendChild(spantext);
          finishMessage.appendChild(span);
          let button = document.createElement("button");
          button.classList.add("btn");
          let buttonText = document.createTextNode("Play Again");
          button.appendChild(buttonText);
          finishMessage.appendChild(button);
          button.addEventListener("click", function () {
            location.reload();
          });
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        spantext = document.createTextNode("GameOver");
        span.appendChild(spantext);
        finishMessage.appendChild(span);
        let button = document.createElement("button");
        button.classList.add("btn");
        let buttonText = document.createTextNode("Play Again");
        button.appendChild(buttonText);
        finishMessage.appendChild(button);
        button.addEventListener("click", function () {
          location.reload();
        });
      }
    }
  }, 1000);
}
