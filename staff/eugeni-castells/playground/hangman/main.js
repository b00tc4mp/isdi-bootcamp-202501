console.clear();
var word = "";
var guessedMatches = 0;
var matches = [];
var errorArr = [];
var matchString = "";
var attempts = 0;
var maxAttempts = 6;
var repeatedChaMessage = "";
var resetGame = false;
var oneCha = "";
function askWord() {
  word = prompt(`What is the secret word?`);
}

function guessCharacter() {
  var match = false;
  while (oneCha !== "yes" && oneCha !== "no") {
    oneCha = prompt("You wanna guess the whole word? Write 'yes' or 'no'");
  }

  let cha = "";

  if (oneCha === "yes") {
    cha = prompt("What word?");
  } else if (oneCha === "no") {
    cha = prompt("What letter?");
  }

  if (oneCha === "no" || oneCha === "No") {
    for (let i = 0; i < word.length; i++) {
      if (cha === word[i] && cha !== matches[i]) {
        matches[i] = cha;
        guessedMatches++;
        match = true;
      } else if (cha === word[i] && cha === matches[i]) {
        repeatedChaMessage = "Oops, looks like the letter was already guessed.";
      }
    }
  } else if (oneCha === "yes" || oneCha === "Yes") {
    if (word === cha) {
      guessedMatches = word.length;
    }
  }
  if (match === false) {
    attempts++;
    errorArr.push(cha);
  }
  oneCha = "";
}

function isGameWon() {
  if (guessedMatches === word.length) {
    alert(
      `Congrats, you won! The word was ${word}. You had ${
        maxAttempts - attempts
      } attempts remaining. What a beast!`
    );
    attempts = 6;
  } else if (guessedMatches < word.length && attempts < maxAttempts) {
    printAttempts();
  } else {
    alert(`Oh no, you lost :( The word was ${word}`);
  }
}
function printAttempts() {
  if (maxAttempts - attempts > 1) {
    alert(`${repeatedChaMessage} ${
      maxAttempts - attempts
    } attempts remaining, keep trying!.
    Your progress: ${matchString}
    Errors: ${errorArr}
    `);
  } else if (maxAttempts - attempts === 1) {
    alert(`${repeatedChaMessage} ${
      maxAttempts - attempts
    } attempt remaining. Be careful!
      Your progress: ${matchString}
      Errors: ${errorArr}
       `);
  }
  repeatedChaMessage = "";
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
