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
var hangMessage = "";
var repeatedErrorMessage = "";
function askWord() {
  word = prompt(`What is the secret word?`);
}

function guessCharacter() {
  repeatedErrorMessage = "";
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
        match = true;
      }
    }
  } else if (oneCha === "yes" || oneCha === "Yes") {
    if (word === cha) {
      guessedMatches = word.length;
    }
  }
  if (match === false) {
    attempts++;
    if (errorArr.length === 0) {
      errorArr.push(cha);
    } else {
      for (let i = 0; i < errorArr.length; i++) {
        if (errorArr[i] !== cha) {
          errorArr.push(cha);
        } else
          repeatedChaMessage =
            "You already said that letter and it's wrong. Focus.";
      }
    }

    //hangMan()
  }
  oneCha = "";
}
/*function hangMan(){
  switch(attempts){
    case 0:
      break;
    case 1:
      hangMessage=`೦`
      break;
    case 2:
      hangMessage=`ႃ`
      break;
    case 3:
      hangMessage=`_ႃ`
        break;
    case 4:
    hangMessage=`_ႃ_`
    case 5:
    hangMessage=`_ႃ_ \n
                  /`
    break;
    case 6:
      hangMessage=`_ႃ_ \n /\``
      break;
    default:
      break;
  }
}*/
function isGameWon() {
  if (guessedMatches === word.length) {
    alert(
      `Congrats, you won! The word was ${word}. You had ${
        maxAttempts - attempts
      } attempts remaining. What a beast!
      `
    );
    attempts = 6;
  } else if (guessedMatches < word.length && attempts < maxAttempts) {
    printAttempts();
  } else {
    alert(`Oh no, you lost :( The word was ${word}   ${hangMessage}`);
  }
}
function printAttempts() {
  if (maxAttempts - attempts > 1) {
    alert(`${repeatedChaMessage} ${repeatedErrorMessage} ${
      maxAttempts - attempts
    } attempts remaining, keep trying!.
    Your progress: ${matchString}
    Errors: ${errorArr}
    ${hangMessage}
    `);
  } else if (maxAttempts - attempts === 1) {
    alert(`${repeatedChaMessage} ${repeatedErrorMessage} ${
      maxAttempts - attempts
    } attempt remaining. Be careful!
      Your progress: ${matchString}
      Errors: ${errorArr}
      ${hangMessage}
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
