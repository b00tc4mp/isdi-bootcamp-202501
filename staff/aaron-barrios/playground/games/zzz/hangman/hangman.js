console.clear()

//--- DATA ---
var lives = 6
var guessCharacter = ''
var guessedCount = 0
var wrongCharacters = []
var matches = []
var guessWord = ''
var word = ''

var one = ''
var two = ''
var three = ''
var four = ''
var five = ''
var six = ''

//--- LOGIC ---
function setGame() {
    for (var i = 0; i < word.length; i++)
        matches[i] = '_'

    console.log(matches)

    printMatches()
}

function printMatches() {
    var matchesString = ''

    for (var i = 0; i < matches.length; i++)
        matchesString += matches[i] + ' '
    alert(
        `${matchesString}
        Lives: ${lives}
        Incorrect Characters: ${wrongCharacters}`
    )

    askCharacter()
}

function askPlayer() {
    try {
        guessWord = prompt('Guess word: Write yes(y) or no(n)')

        askCharacter()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}


//--- PRESENTATION ---
function startGame() {
    try {
        word = prompt('Write the word!')

        word = word.toLowerCase()

        setGame()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}


function askCharacter() {
    if (guessWord === 'yes' || guessWord === 'y') {
        var vWord = prompt('Word')
        if (vWord === word) {
            guessedCount = word.length
            winorLose()
        }
        else {
            lives = 0
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
    guessCharacter = guessCharacter.toLowerCase() //COMPROBAR SI NO ESCRIBES NADA

    if (wrongCharacters.includes(guessCharacter)) {
        alert(`Ya intentaste la letra "${guessCharacter}" y fue incorrecta. Intenta otra.`)
        askCharacter()
    }

    var found = false

    for (var j = 0; j < word.length; j++) {
        if (word[j] === guessCharacter) {
            if (matches[j] === guessCharacter) {
                lives--
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
        lives--
        switch (lives) {
            case 6:
                one += ' ┌──┐'
                break;
            case 5:
                two += ' |     |'
                break;
            case 4:
                three += ' |   ☹'
                break;
            case 3:
                four += ' |  ⌈⌷⌉'
                break;
            case 2:
                five += ' |    ∆'
                break;
            case 1:
                six += '⍊  ⌋ ⌊'
                break;
        }
        alert(`character not found 
                ${one}
                ${two}
                ${three}
                ${four}
                ${five}
                ${six}
                Lives: ${lives}
                Incorrect Characters: ${wrongCharacters}`)
    }

    if (lives <= 0) {
        alert('You have lost')
        location.reload()
    }
    else
        checkWord()
}

function checkWord() {
    if (guessedCount === word.length) {
        alert(`You have won. The word is ${word}`)
        return
    }
    printMatches()
}

function winorLose() {
    if (guessedCount === word.length) {
        alert(`You have won. The word is ${word}`)
        return
    }
    else {
        lives = 0
        alert('You have lost')
        location.reload()
    }
}


startGame()

///CONDICION DE 1 O + LETRAS