// DATA
var word = ''
var progress = []
// 'stop'
// [false, false, true, false]
var remainingAttemps = 6

// LOGIC

function validateSecretWord (candidateWord) {
    var alphabet = 'aàábcçdeèéfghiíïjklmnñoòópqrstuúüvwxyz'
    
    var wordIsValid = true
    
    for (var i = 0; i < candidateWord.length; i++) {
        var candidateCharacter = candidateWord[i]
        
        var characterInAlphabet = false
        
        for (var j = 0; j < alphabet.length; j++) {
            var alphabetCharacter = alphabet[j]
            
            if (candidateCharacter === alphabetCharacter) {
                characterInAlphabet = true
                break
            }
        }
        if (characterInAlphabet === false) {
            wordIsValid = false
            
            break
        }
    }

    if (wordIsValid === false) {
        throw new Error ('word is not valid (because it has characters that do not match the catalan-spanish-english alphabet. try again.')
    } else {
        // [M3]
        word = candidateWord
        return word
    }
}

function getGameStatus () {
    var status = ''
    
    for (var i = 0; i < progress.length; i++) {
        var characterStatus = progress[i]
        
        if (characterStatus === true) {
            var character = word[i]
            
            status += character
            
        } else
            status += '-'
    }

    return {
        status: status,
        remainingAttemps: remainingAttemps
    }

}

function hasRemainingAttemps () {
    return remainingAttemps !== 0
}

function hasGuessedWord () {
    var progressFullTrue = true
        
    for (var i = 0; i < progress.length; i++) {
            var status = progress[i]
            
            if (status === false) {
                progressFullTrue = false
                
                break
            }
        }

    return progressFullTrue
}

function attemptCharacter () {

}

// PRESENTATION

function introduceWord() {
    var candidateWord = prompt('input a word')
    candidateWord = candidateWord.toLowerCase()

    try {
        validateSecretWord(candidateWord)
    } catch (error) {
        alert(error.message)
        introduceWord()
    }
}

function viewGameStatus () {
    try {
        var gameStatus = getGameStatus()

        console.log(gameStatus.status)

        console.log(gameStatus.remainingAttemps)
    } catch (error) {
        alert(error.message)
    }
}

function tryCharacter () {
    try {
        hasAttempts = hasRemainingAttemps()

        if (!hasAttempts) {
            alert('you have no more attempts.')
        } else {
            var wordGuessed = hasGuessedWord()

            if (wordGuessed) {
                alert('The word was already guessed')
            } else {
                var attemptedCharacter = prompt('character?')
    
                attemptedCharacter = attemptedCharacter.toLowerCase()

                
            }
        }
        
        
    } catch (error) {
        
    }
    
    
    var attemptedCharacter = prompt('character?')
    
    attemptedCharacter = attemptedCharacter.toLowerCase()
}