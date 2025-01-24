console.clear()

//var word = prompt('word?')
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
    var isMatched = false
    // mejor i por que itera solo la funcion hasta que termine la funcion luego se destruye
    for (var k = 0; k < word.length; k++) {
        if (word[k] === guessCharacter) {
            matches[k] = word[k]
            isMatched = true
        }
    }
    if (isMatched === false) {
        maxAttemps -= 1
    }
    // TODO
}



console.log('...')

printMatches()
askCharacter()
checkGuessCharacterMatches()
printMatches()