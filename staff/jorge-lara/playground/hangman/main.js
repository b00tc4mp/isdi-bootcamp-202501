let word = "";

do{
    word = prompt('Enter a word')    
}while (word.length <= 0)

let matchesString = '';
let attemps = 6;
let character = '';
let matches = [];
let end = false;

for (let i = 0; i < word.length; i++) {
    matches[i] = '_';
}

function printMatches() {
    matchesString = "";

    for (let i = 0; i < matches.length; i++) {
        matchesString += matches[i] + " ";
    }

    return matchesString;
}

function askCharacter() {
    do {
        character = prompt("Write a character\nProgress: " + printMatches() + "\nAttempts left: " + attemps);
    } while (!(character.length == 1))

}

function checkCharacter() {
    let found = false;

    for (let j = 0; j < word.length; j++) {
        if (character === word[j]) {
            matches[j] = character;
            found = true;
        }
    }
    wordFound();

    if (found) {
        printMatches();
    } else {
        attemps--;
        alert("Wrong character!");
    }
}

function wordFound() {
    let isFinished = true;

    for (let n = 0; n < word.length; n++) {
        if (matches[n] != word[n]) {
            isFinished = false;
        }
    }
    end = isFinished;
}

function coreGame() {

    do {
        askCharacter();
        checkCharacter();

    } while (!end && attemps > 0);

    if (attemps == 0) {
        alert("You lose! " + "The word was: " + word);
    } else {
        alert("Congratulations, you found the word! " + word);
    }

}

coreGame();
