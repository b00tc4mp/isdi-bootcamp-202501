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

var one = ''
var two = ''
var three = ''
var four = ''
var five = ''
var six = ''

function printMatches() {
    var matchesString = ''

    for (var i = 0; i < matches.length; i++)
        matchesString += matches[i] + ' '
    alert(
        `${matchesString}
        Attempts: ${attempts}
        Incorrect Characters: ${wrongCharacters}`
    )
}

function askCharacter() {
    guessWord = prompt('Guess word: Write yes or no')
    if (guessWord === 'yes') {
        var vWord
        word = prompt('Word')
        if (vWord === word) {
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
        wrongCharacters.push(guessCharacter)
        attempts++
        if (attempts === 1) {
            one += ' ┌──┐'
        }
        else if (attempts === 2) {
            two += ' |     |'
        }
        else if (attempts === 3) {
            three += ' |   ☹'
        }
        else if (attempts === 4) {
            four += ' |  ⌈⌷⌉'
        }
        else if (attempts === 5) {
            five += ' |    ∆'
        }
        else if (attempts === 6) {
            six += '⍊  ⌋ ⌊'
        }
        alert(`character not found 
                ${one}
                ${two}
                ${three}
                ${four}
                ${five}
                ${six}
                Attempts: ${attempts}
                Incorrect Characters: ${wrongCharacters}
                `)
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