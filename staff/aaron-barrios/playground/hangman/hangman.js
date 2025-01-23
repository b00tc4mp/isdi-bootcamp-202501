var word = prompt('word?')
//var word = 'water'
var matches = []

for (var i = 0; i < word.length; i++)
    matches[i] = '_'

console.log(matches)

var attempts = 0
var maxAttempts = 6
var guessCharacter = ''
var guessedCount = 0

function printMatches() {
    var matchesString = ''

    for (var i = 0; i < matches.length; i++)
        matchesString += matches[i] + ' '
    console.log(matchesString)
}

function askCharacter() {
    guessCharacter = prompt('character?')
    guessCheckCharacter()
}

function guessCheckCharacter() {
    var found = false

    for (var j = 0; j < word.length; j++) {
        if (word[j] === guessCharacter) {
            matches[j] = guessCharacter
            guessedCount++
            found = true
        }
    }

    if (!found) {
        attempts++
    }

    if (attempts >= maxAttempts) {
        alert('You have lost')
        location.reload()
    }
    else
        checkWord()
}

function checkWord() {
    if (guessedCount === word.length) {
        printMatches()
        console.log('you won')
    }
    else {
        printMatches()
        askCharacter()
    }
}

printMatches()
askCharacter()