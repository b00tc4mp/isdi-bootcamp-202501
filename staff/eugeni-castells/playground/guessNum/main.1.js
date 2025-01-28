console.clear();

var secretNumber = 0;
var guessedNumber = 0;
var level = "";
var attempts = 0;
var coldPercentage = 50;
var temperedPercentage = 60;
var warmPercentage = 75;
var hotPercentage = 85;
var veryHotPercentage = 95;
var maximumLevelValue = 0;
var win = false;

function generateRandomNumber(level) {
  switch (level) {
    case "1":
      secretNumber = Math.floor(Math.random() * 50) + 1;
      maximumLevelValue = 50;
      break;
    case "2":
      secretNumber = Math.floor(Math.random() * 100) + 1;
      maximumLevelValue = 100;
      break;
    case "3":
      secretNumber = Math.floor(Math.random() * 150) + 1;
      maximumLevelValue = 150;
      break;
    default:
      break;
  }
  return secretNumber;
}

function askNumber() {
  guessedNumber = parseInt(prompt("What is your guess?"));

  while (guessedNumber < 0 || guessedNumber > maximumLevelValue) {
    guessedNumber = parseInt(
      `Write a number between 0 and ${maximumLevelValue}`
    );
  }
}

function setLevel() {
  while (level !== "1" && level !== "2" && level !== "3") {
    level = prompt(
      "What level do you want to play?\n1: Guess between 0 - 50 (Easy)\n2: Guess Between 0 - 100 (Medium)\n3: Guess between 0 - 150 (Difficult)"
    );
  }

  return level;
}

function makePositiveNumber(number) {
  var rest = number - secretNumber;

  if (rest < 0) {
    return rest * -1;
  } else {
    return rest;
  }
}
function checkNumber() {
  var normalizedRest = makePositiveNumber(guessedNumber);

  if (normalizedRest > Math.floor((secretNumber * 50) / 100) + 1) {
    attempts++;
    alert(`Cold! ${10 - attempts} reamining!`);
    checkIfLost();
  } else if (
    normalizedRest <= Math.floor((secretNumber * 50) / 100) &&
    normalizedRest > Math.floor((secretNumber * 40) / 100) + 1
  ) {
    attempts++;
    alert(`Tempered! ${10 - attempts} reamining!`);
    checkIfLost();
  } else if (
    normalizedRest <= (secretNumber * 40) / 100 &&
    normalizedRest > Math.floor((secretNumber * 30) / 100)
  ) {
    attempts++;
    alert(`Warm! ${10 - attempts} reamining!`);
    checkIfLost();
  } else if (
    normalizedRest <= (secretNumber * 30) / 100 &&
    normalizedRest > Math.floor((secretNumber * 20) / 100)
  ) {
    attempts++;
    alert(`HOT! ${10 - attempts} reamining!`);
    checkIfLost();
  } else if (
    normalizedRest <= (secretNumber * 20) / 100 &&
    normalizedRest > Math.floor((secretNumber * 1) / 100)
  ) {
    attempts++;
    alert(`Very hot! ${10 - attempts} reamining!`);
    checkIfLost();
  } else if (normalizedRest === 0) {
    alert(`Congratulations, you won! The number was ${secretNumber}`);
    reset();
  }
}

function reset() {
  var resetGame = "";
  var resetGame = prompt("Do you want to restart the game?");

  if (resetGame === "yes") {
    generateRandomNumber(setLevel());

    attempts = 0;
  } else {
    attempts = 10;
    win = true;
  }
}

function checkIfLost() {
  if (attempts === 10) {
    alert("You reached the maximum attempts.");
    reset();
  }
}

generateRandomNumber(setLevel());

while (attempts < 10 && !win) {
  askNumber();
  checkNumber();
}
