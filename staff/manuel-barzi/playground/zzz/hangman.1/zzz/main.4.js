console.clear()

var word = prompt('word?')
//var word = 'murcielago'
var matches = []

for (var i = 0; i < word.length; i++)
    matches[i] = '_'

var attemps = 0
var maxAttemps = 6
var guessCharacter = ''

function printMatches() {
    var matchesString = ''

    for (var i = 0; i < matches.length; i++) {
        matchesString += matches[i] + (i < matches.length - 1 ? ' ' : '')
    }

    console.log(matchesString)
}

function askCharacter() {
    guessCharacter = prompt('character?')
}

function checkGuessCharacterMatches() {
    // TODO
    /*
    check character matches in word, and update matches array, and update attemps

    define variable characterFound to false, to keep track of matching case (guessCharacter is found in word)
    iterate on word, character by character, comparing it with guessCharacter
    on each iteration, if character matches guessCharacter, assign character to that position in matches array, and mark that character was found (set aux variable characterFound to true)
    after all iterations on characters of word, if characterFound is yet false, then increase attemps by one unit
    */

    var characterFound = false

    for (var i = 0; i < word.length; i++) {
        if (word[i] === guessCharacter) {
            matches[i] = word[i]

            characterFound = true
        }
    }

    if (characterFound === false && attemps < maxAttemps) attemps++
}

function printStatus() {
    var remainingAttemps = maxAttemps - attemps

    console.log('you have ' + remainingAttemps + ' attemps')

    if (remainingAttemps === 0)
        console.log('you loose')
    else {
        var match = true

        for (var i = 0; (i < matches.length) && match; i++)
            if (matches[i] !== word[i])
                match = false

        if (match === true)
            console.log('you win!')
    }
}


console.log('...')

//printMatches()
//askCharacter()
//checkGuessCharacterMatches()
//printMatches()
