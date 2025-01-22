let word = prompt('Enter a word')

let matchesString = '';
let attemps = 6;
let character = '';
let matches = [];
let aux = 1;
let end = false;

for (let i = 0; i < word.length; i++) {
    matches[i] = '_';
}

//WIP method (its so bad)
function printMatches() {
    if (aux == 1) {
        for (let i = 0; i < matches.length; i++) {
            matchesString += matches[i] + " ";
        }
        aux++;
    } else {
        matchesString = "";
        for (let k = 0; k < matches.length; k++) {
            matchesString += matches[k] + " ";
        }
    }

    console.log(matchesString);
}

function askCharacter() {
    do {
        character = prompt("character");
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
        console.log("Wrong, Attempts left:" + attemps);
    }
}

function wordFound() {
    for (let n = 0; n < word.length; n++) {
        if (matches[n] != word[n]) {
            return;
        }
    }
    end = true
}

function coreGame() {
    console.log("...");

    do {
        askCharacter();
        checkCharacter();

    } while (!end && attemps > 0);

    if (attemps == 0) {
        console.log("You lose!")
    } else {
        console.log("You won!")
    }

}

coreGame();
