console.clear();
var word = "";

var matches = [];
var matchString = "";
var attempts = 0;
var maxAttempts = 6;

function askWord() {
  word = prompt(`What is the secret word?`);
}

function guessCharacter() {
  let cha = prompt("What letter?");
  let mockCounter = 0;
  for (let i = 0; i < word.length; i++) {
    if (cha === word[i]) {
      matches[i] = cha;
      mockCounter++;
    }
  }
  if (mockCounter === 0) {
    attempts++;
  }
}
function isGameWon() {
  let mockCounter = 0;
  for (let i = 0; i < matches.length; i++) {
    if (matches[i] !== "_") {
      mockCounter++;
    }
  }
  if (mockCounter === matches.length) {
    alert(`Congrats,you won! The word was ${word}.`);
    attempts = 6;
  } else if (mockCounter < matches.length && attempts < maxAttempts) {
    printAttempts();
  } else {
    alert("Oh no, you lost! :(");
  }
}
function printAttempts() {
  if (maxAttempts - attempts > 1) {
    alert(`${maxAttempts - attempts} attempts remaining, keep trying!.
    Your progress: ${matchString}`);
  } else if (maxAttempts - attempts === 1) {
    alert(`${maxAttempts - attempts} attempt remaining. Be careful!`);
  }
}
function returnMatchesString() {
  matchString = "";
  for (let i = 0; i < matches.length; i++) {
    matchString += matches[i] + " ";
  }
}

askWord();
for (let i = 0; i < word.length; i++) {
  matches[i] = "_";
}
returnMatchesString();
while (attempts < maxAttempts) {
  guessCharacter();
  returnMatchesString();
  isGameWon();
}

console.log("...");
