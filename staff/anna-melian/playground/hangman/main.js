console.clear()
var word = prompt ('Choose a secret word:')
var matches = []

for (var i = 0; i < word.length; i++)
    matches[i] = "_"

var attemps = 0
var maxAttemps = 6
var guessCharacter = ""
var equalCharacters = 0

function printMatches() {
    var matchesString = ""

    for (var i = 0; i < matches.length; i++)
        matchesString += matches[i] + " "

    console.log(matchesString)
}

function askCharacter() {
    guessCharacter = prompt("Choose a character")

    
}



function checkGuessCharacterMatches() {
    var correct = 0
    for (i = 0; i < word.length; i++) {
        if (guessCharacter!=word[i]) {
            
            
            }
        else {
            correct++
            equalCharacters++
            matches[i] = guessCharacter
            
        }
        
    }
    if (correct != 0) {
        printMatches()
        console.log("Correct!")
    }
    else {
        console.log("Wrong!")
        attemps++
    }
    
}

function asks() {
    while (equalCharacters!=word.length) {
        if (attemps!=maxAttemps) {
        askCharacter()
        checkGuessCharacterMatches()
        }
        else {
        console.log("You lose!" + " The secret word was " + word)
        }
    }
    console.log("Congratulations! You win!!!")
}
console.log("...")
printMatches()
asks()