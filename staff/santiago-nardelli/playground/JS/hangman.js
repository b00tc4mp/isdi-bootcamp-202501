
var word = 'murcielago'
var matches = []

for (var i = 0; i < word.length; i++)
    matches[i] = '_'

var attemps = 0
var maxAttemps = 6
var guessCharacter = ''

function printMatches() {
    var matchesString = ''

    for (var i = 0; i < matches.length; i++)
        matchesString += matches[i] + ' '

    console.log(matchesString)
}

function askCharacter() {
    guessCharacter = prompt('character?')
}

function checkGuessCharacterMatches() {
    // TODO
}


console.log('...')

printMatches()
askCharacter()
checkGuessCharacterMatches()
printMatches()