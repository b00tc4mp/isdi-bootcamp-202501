let word = "";

do{
    word = prompt('Enter a word')    
}while (word.length <= 0)

let matchesString = '';
let attemps = 6;
let character = '';
let stickman = "";
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
        character = prompt("Write a character\nProgress: " + printMatches() + "\nAttempts left: " + attemps + "\n" + drawCharacter());
    } while (!(character.length == 1))

}

function drawCharacter() {

    switch (attemps) {
    case 5:
        stickman += "-----\n";
        break;
    case 4:
        stickman += "   |  \n";
        break;
    case 3:
        stickman += "  O  \n";
        break;
    case 2:
        stickman += "  ▋ \n";
        break;
    case 1:
        stickman += "  ❘ ❘  \n";
        break;
    case 0:
        stickman += "  L L  \n";
        break;
    }
    return stickman;
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
        alert("You lose! " + "The word was: " + word + "\n" + drawCharacter());
    } else {
        alert("Congratulations, you found the word! " + word);
    }

}

coreGame();
