// Hangman exercise

 console.clear()

    var word = prompt('word?')
    var matches = []

    for (var i = 0; i < word.length; i++) 
    matches[i] = '_'

    var attempts = 0
    var lives = 6
    var guessCharacter = ''

    function printMatches() {
        var matchesString = ''
        
        for (var i = 0; i < matches.length; i++) {
            matchesString += matches[i] + ' '
        }
        console.log(matchesString)
    }

    function askCharacter() {
    guessCharacter = prompt(`character?`)
    }

function checkGuessCharacterMatches() {
    var isFound = false
    
        for (var j = 0; j < word.length; j++) {
                 
            if (guessCharacter == word[j]) {
                matches[j] = word[j]
                isFound = true
            } 
            
        }
    
    if (isFound === false) {
        lives--
    }
}

function win() {
    let result = false
    for (var h = 0; h < word.length; h++) {
        if (matches[h] === word[h]) {
            result = true
        } else {
            result = false
            break
        }
    }
    return result
}

printMatches()
while (lives > 0 && win() === false) {
askCharacter()
checkGuessCharacterMatches()
printMatches()
}

if (lives > 0) {
    console.log('You win, the word is: ' + word)
} else {
    console.log('You\'ve lost, try again!') 
}



console.log('...')

