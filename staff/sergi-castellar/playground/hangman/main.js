console.clear()

//var word = 'ura' //palabra a adivinar
var word = prompt('keloke') //palabra a adivinar
var matches = [] // array de almacenaje de '_' y letras adivinadas

for (var i = 0; i < word.length; i++){ //bucle para mostrar primero los '_'
    matches[i] = '_'
}

var attempts = 0 //intentos actuales
var maxAttempts = 6 //intentos maximos
var guessCharacter = '' //intento de letra dada
var charactersChecked = []

function askCharacter() { // funcion que pregunta input por prompt y retorna el input
    guessCharacter = prompt('prueba con una letra')
    //guessCharacter = 'u'
    checkGuessCharacterMatches(guessCharacter)
}

function checkIfChecked(guessCharacter) {
    var isChecked
    for (var i = 0; i < charactersChecked.length; i++) {
        if (guessCharacter === charactersChecked[i]) {
            isChecked = true
            alert('Esa ya la has dicho, que no te enteras')
            return isChecked
        } else {
            isChecked = false
            return isChecked 
        }
    }
}

function checkGuessCharacterMatches(guessCharacter) { //comparar letra dada con cada caracter de la palabra
    if (checkIfChecked(guessCharacter) === false) {
        var isCorrect = false
        for (var i = 0; i < word.length; i++) {
            if (guessCharacter === word[i]) {
                matches[i] = guessCharacter
                isCorrect = true
            }
        }
        if (isCorrect === false) { // si la letra no coincide con ninguna de las letras de la palabra, 
            attempts += 1 // suma un intento a attempts
            alert('Error, llevas ' + attempts + ' intentos de ' + maxAttempts) // retorna alert con los intentos
            printMatches()
        } else {
            alert('¡Vas bien!')
            printMatches()
        }
        if (attempts < maxAttempts) { //si no has perdido sigues jugando
            askCharacter()
        } else {
            alert('Has perdido.' + attempts + ' intentos de ' + maxAttempts)
        }
    }
}

function printMatches() { //printea por consola el array con _ y letras adivinadas
    var matchesString = ''
    for (var i = 0; i < matches.length; i++) {
        matchesString += matches[i] + ' '
    }
    console.log(matchesString)
}

askCharacter()


