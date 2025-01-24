console.clear()
var word = prompt ('Choose a secret word:')
var matches = []

for (var i = 0; i < word.length; i++)
    matches[i] = "_"

var attemps = 0
var maxAttemps = 4
var guessCharacter = ""
var end = false

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
    var anyone = true
    for (var i = 0; i < word.length; i++) {
        if (guessCharacter===word[i]) {
            matches[i] = guessCharacter
            anyone = false
            }
            
        }
    if (anyone) {
        console.log('Wrong')
        attemps++
        console.log("You have " + (maxAttemps - attemps) + " attemps left")
    }
    else {
        console.log('Correct')
    }
    } 



function winOrDefeat() {
    var allEquals = true
    for (var i = 0; i < word.length; i++) {
        if (matches[i]!=word[i]) {
            allEquals = false
        }
        }
    if (allEquals) {
        console.log('You win!')
        end = true
    }
    if (attemps===maxAttemps) {
        console.log('You lost. The secret word was: ' + word)
        end = true
        }
}

function play() {
    while (end != true) {
        askCharacter()
        checkGuessCharacterMatches()
        if (attemps!=maxAttemps) {
            printMatches()
        }
        winOrDefeat()
        
    }
        
}


console.log("...")
printMatches()
play()