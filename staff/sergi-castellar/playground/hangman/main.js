console.clear()

var word = '' //palabra a adivinar
var matches = [] // array de almacenaje de '_' y letras adivinadas
var attempts = 0 //intentos actuales
var maxAttempts = 6 //intentos maximos
var guessCharacter = '' //intento de letra dada
var charactersChecked = [] // array de letras ya introducidas
var correctCharacters = 0 // letras de la palabra que llevas adivinadas

function askWord() { // pregunta por prompt la palabra a adivinar
    var localWord = prompt('Introduce la palabra a adivinar')
    if (isWordInLowerCase(localWord) === true) {
        word = localWord
        initialLowBarArray()
    } else {
        alert('Solo palabras en minuscula y sin espacios :)')
        askWord()
    }
}

function initialLowBarArray() { // funcion para mostrar primero los '_'
    for (var i = 0; i < word.length; i++){ 
    matches[i] = '_'
    }
}

function askCharacter() { // funcion que pregunta input por prompt y retorna el input
    var printMatches = printArray(matches)
    var printCharactersChecked = printArray(charactersChecked)
    if (charactersChecked.length === 0) {
        guessCharacter = prompt('prueba con una letra \n' + printMatches)
    } else {
        guessCharacter = prompt('prueba con una letra \n' + printMatches + '\nLetras intentadas: ' + printCharactersChecked)
    }
    checkGuessCharacterMatches(guessCharacter)
}

function checkGuessCharacterMatches(guessCharacter) { //comparar letra dada con cada caracter de la palabra
    if (onlyOneSimpleLetter(guessCharacter) === true) {
        if (checkIfChecked(guessCharacter) === false) {
            var isCorrect = false
            for (var i = 0; i < word.length; i++) {
                if (guessCharacter === word[i]) {
                    matches[i] = guessCharacter
                    correctCharacters += 1
                    isCorrect = true
                }
            }
            if (isCorrect === false) { // si la letra no coincide con ninguna de las letras de la palabra, 
                charactersChecked.push(guessCharacter)
                attempts += 1 // suma un intento a attempts
                var dollDraw = drawDoll(attempts)
                alert('Error, llevas ' + attempts + ' intentos de ' + maxAttempts + '\n' + dollDraw) // retorna alert con los intentos
            } else {
                if (correctCharacters === word.length) {
                    alert('¡Has ganado!. Efectivamente, la palabra era ' + word + '. Volvamos a jugar')
                    resetGame()
                } else {
                    alert('¡Vas bien! Sigues con ' + attempts + ' intentos de ' + maxAttempts)
                }
            }
            if (attempts < maxAttempts) { //si no has perdido sigues jugando
                askCharacter()
            } else {
                alert('Has perdido. ' + attempts + ' intentos de ' + maxAttempts + '.\nLa palabra era ' + word + '. Volvamos a jugar :)')
                resetGame()
            }

        } else {
            alert('Esa ya la has dicho, que no te enteras. Sigues con ' + attempts + ' intentos de ' + maxAttempts)
            askCharacter()
        }
    } else if (isThisTheResult(guessCharacter) === true) {
        if (guessCharacter === word) {
            alert('¡Has ganado!. Efectivamente, la palabra era ' + word + '. Volvamos a jugar')
                    resetGame()
        } else {
            alert('Has perdido por querer adelantarte ;)\nLa palabra era ' + word + '. Volvamos a jugar :)')
                resetGame()
        }
        
    } else {
        alert('Solo se acepta una letra minúscula de la a a la z sin ningún simbolo. Si ya tienes la respuesta, prueba a añadir una palabra de ' + word.length + ' letras.')
        askCharacter()
    }  
}

function checkIfChecked(guessCharacter) { // mira si esa letra ya ha sido introducida en esta partida
    var isChecked = false
    for (var i = 0; i < charactersChecked.length; i++) {
        if (guessCharacter === charactersChecked[i]) {
            isChecked = true
        }
    }
    return isChecked
}

function isWordInLowerCase(input) {
    var regex = /^[a-z]+$/
    if (regex.test(input)){
        return true
    } else {
        return false
    }
}

function onlyOneSimpleLetter(input) {
    var regex = /^[a-z]$/
    if (regex.test(input)){
        return true
    } else {
        return false
    }
}

function isThisTheResult(input) {
    var n = word.length
    const regex = new RegExp(`^[a-z]{${n}}$`);
    
    if (regex.test(input)){
        return true
    } else {
        return false
    }
}

function printArray(arr) {
    var arrString = ''
    for (var i = 0; i < arr.length; i++) {
        arrString += arr[i] + ' '
    }
    return arrString
}

function resetGame() { // resetea variables para volver a empezar
    word = ''
    guessCharacter = ''
    attempts = 0
    correctCharacters = 0
    matches = []
    charactersChecked = []
    askWord()
    askCharacter()
}

function drawDoll(attempts) {
    var dollDraw = [
        `
           _______
          |/      |
          |      
          |      
          |            
         _|_
        |   |
        `,
        `
           _______
          |/      |
          |      (_)
          |      
          |            
         _|_
        |   |
        `,
        `
           _______
          |/      |
          |      (_)
          |       |
          |       |      
         _|_
        |   |
        `,
        `
           _______
          |/      |
          |      (_)
          |      \\|
          |       |      
         _|_
        |   |
        `,
        `
           _______
          |/      |
          |      (_)
          |      \\|/
          |       |      
         _|_
        |   |
        `,
        `
           _______
          |/      |
          |      (_)
          |      \\|/
          |       |             
         _|_     / 
        |   |
        `,
        `
           _______
          |/      |
          |      (_)
          |      \\|/
          |       |             
         _|_     / \\
        |   |
        `
    ]
    return dollDraw[attempts]
}

askWord()
askCharacter()