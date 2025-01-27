console.clear()
var word = prompt ('Choose a secret word:')
var matches = []
var mistakes = []

for (var i = 0; i < word.length; i++)
    matches[i] = "_"

var attemps = 0
var maxAttemps = 6
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
        var repeatMistake = false
        for (var j = 0; j < mistakes.length; j++) {
            if (guessCharacter ===mistakes[j]) {
            console.log('%cWrong, you have already tried this character.', 'color: red; background-color: white; font-size: 15px; font-weight: bold;')
            console.log("You have " + (maxAttemps - attemps) + " attemps left")
            console.log('Characters tried: ' + mistakes)
            repeatMistake = true
        }
        }
        if (repeatMistake===false) {
            console.log('%cWrong', 'color: red; background-color: white; font-size: 15px; font-weight: bold;')
            attemps++
            console.log("You have " + (maxAttemps - attemps) + " attemps left")
            mistakes += guessCharacter + ', '
            console.log('Characters tried: ' + mistakes)
            }
    }
    else {
        console.log('%cCorrect', 'color: green; background-color: white; font-size: 15px; font-weight: bold;')
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
        console.log('%cYou win!', 'color: yellow; font-size: 20px; font-weight: bold;')
        end = true
    }
    if (attemps===maxAttemps) {
        console.log('%cYou lost. The secret word was: ' + word , 'color: black; background-color: white; font-size: 20px; font-weight: bold;')
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