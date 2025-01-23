var word = prompt('Write the word!')
//var word = 'water'
var matches = []

for (var i = 0; i < word.length; i++)
    matches[i] = '_'

console.log(matches)

var attempts = 0
var maxAttempts = 6
var guessCharacter = ''
var guessedCount = 0
var wrongCharacters = []
var guessWord = ''

function printMatches() {
    var matchesString = ''

    for (var i = 0; i < matches.length; i++)
        matchesString += matches[i] + ' '
    alert(
        `${matchesString}
        Attempts: ${attempts}
        Incorrect Characters: ${wrongCharacters}`)
}

function askCharacter() {
    guessWord = prompt('Guess word: Write yes or no')
    if (guessWord === 'yes') {
        var word
        word = prompt('Word')
        if (word === word) {
            guessedCount = word.length
            winorLose()
        }
        else {
            attempts = maxAttempts
            alert('You have lost')
            location.reload()
        }
    }
    else if (guessWord === 'no') {
        guessCharacter = prompt('character?')
        guessCheckCharacter()
    }
    else {
        guessCharacter = prompt('character?')
        guessCheckCharacter()
    }

}

function guessCheckCharacter() {
    var found = false

    for (var j = 0; j < word.length; j++) {
        if (word[j] === guessCharacter) {
            if (matches[j] === guessCharacter) {
                attempts++
                alert('character already wrote')
                found = true
                break
            } else {
                matches[j] = guessCharacter
                guessedCount++
                found = true
            }
        }
    }

    if (!found) {
        attempts++
        alert('character not found')
        wrongCharacters.push(guessCharacter)
    }

    if (attempts >= maxAttempts) {
        alert('You have lost')
        location.reload()
        //revisar
    }
    else
        checkWord()
}

function checkWord() {
    if (guessedCount === word.length) {
        alert(`You have won. The word is ${word}`)
    }
    else {
        printMatches()
        askCharacter()
    }
}

function winorLose() {
    if (guessedCount === word.length) {
        alert(`You have won. The word is ${word}`)
    }
    else {
        attempts = maxAttempts
        alert('You have lost')
        location.reload()
    }
}


printMatches()
askCharacter()

///HACERLO CON ALERTA 