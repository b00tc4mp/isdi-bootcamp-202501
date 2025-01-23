console.clear()

//var word = 'ura' //palabra a adivinar
var word = '' //palabra a adivinar
var matches = [] // array de almacenaje de '_' y letras adivinadas
var attempts = 0 //intentos actuales
var maxAttempts = 6 //intentos maximos
var guessCharacter = '' //intento de letra dada
var charactersChecked = []
var correctCharacters = 0

function askWord() {
    var localWord = prompt('Introduce la palabra a adivinar')
    word = localWord
    initialLowBarArray()
}

function initialLowBarArray() {
    for (var i = 0; i < word.length; i++){ //bucle para mostrar primero los '_'
    matches[i] = '_'
    }
}

function askCharacter() { // funcion que pregunta input por prompt y retorna el input
    guessCharacter = prompt('prueba con una letra \n' + matches)
    checkGuessCharacterMatches(guessCharacter)
}

function checkIfChecked(guessCharacter) {
    var isChecked = false
    for (var i = 0; i < charactersChecked.length; i++) {
        if (guessCharacter === charactersChecked[i]) {
            isChecked = true
        }
    }
    return isChecked
}

function checkGuessCharacterMatches(guessCharacter) { //comparar letra dada con cada caracter de la palabra
    if (checkIfChecked(guessCharacter) === false) {
        charactersChecked.push(guessCharacter)
        var isCorrect = false
        for (var i = 0; i < word.length; i++) {
            if (guessCharacter === word[i]) {
                matches[i] = guessCharacter
                correctCharacters += 1
                isCorrect = true
            }
        }
        if (isCorrect === false) { // si la letra no coincide con ninguna de las letras de la palabra, 
            attempts += 1 // suma un intento a attempts
            alert('Error, llevas ' + attempts + ' intentos de ' + maxAttempts + '\n' + charactersChecked) // retorna alert con los intentos
        } else {
            if (correctCharacters === word.length) {
                alert('¡Has ganado!. Efectivamente, la palabra era ' + word + ' Volvamos a jugar')
                resetGame()
            } else {
                alert('¡Vas bien!\n' + matches)
            }
        }
        if (attempts < maxAttempts) { //si no has perdido sigues jugando
            askCharacter()
        } else {
            alert('Has perdido.' + attempts + ' intentos de ' + maxAttempts + '.\nLa palabra era ' + word + '. Volvamos a jugar :)')
            resetGame()
        }

    } else {
        alert('Esa ya la has dicho, que no te enteras. Sigues con ' + attempts + ' intentos de ' + maxAttempts + '\n' + matches)
        askCharacter()
    }
}

function resetGame() {
    word = ''
    guessCharacter = ''
    attempts = 0
    correctCharacters = 0
    matches = []
    charactersChecked = []
    askWord()
    askCharacter()
}

askWord()
askCharacter()


