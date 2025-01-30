// DATA

var word = ''
var progress = []
// 'stop'
// [false, false, true, false]
var remainingAttemps = 6

// LOGIC

function keepGuessingWord(candidateWord) {
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
        throw new Error('invalid word') // -> { message: 'invalid word' }
    } else {
        // [M3]

        word = candidateWord

        for (var i = 0; i < word.length; i++)
            progress[i] = false
    }
}

function getGameStatus() {
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

function hasRemainingAttemps() {
    return remainingAttemps !== 0
}

function hasGuessedWord() {
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

function attemptCharacter(attemptedCharacter) {
    // [M2]
    var alphabet = 'aàábcçdeèéfghiíïjklmnñoòópqrstuúüvwxyz'

    var characterInAlphabet = false

    for (var i = 0; i < alphabet.length; i++) {
        var alphabetCharacter = alphabet[i]

        if (attemptedCharacter === alphabetCharacter) {
            characterInAlphabet = true

            break
        }
    }

    // [M3]

    if (characterInAlphabet === false) {
        throw new Error('invalid character')
    } else {
        // [M4]

        var attemptedCharacterFound = false

        for (var i = 0; i < word.length; i++) {
            var character = word[i]

            if (attemptedCharacter === character) {
                progress[i] = true

                attemptedCharacterFound = true
            }
        }

        // [M5]

        if (attemptedCharacterFound === false) {
            remainingAttemps--
        }
    }
}

function attemptWord(attemptedWord) {
    // [M2]

    var alphabet = 'aàábcçdeèéfghiíïjklmnñoòópqrstuúüvwxyz'

    var wordIsValid = true

    for (var i = 0; i < attemptedWord.length; i++) {
        var attemptedCharacter = attemptedWord[i]

        var characterInAlphabet = false

        for (var j = 0; j < alphabet.length; j++) {
            var alphabetCharacter = alphabet[j]

            if (attemptedCharacter === alphabetCharacter) {
                characterInAlphabet = true

                break
            }
        }

        if (characterInAlphabet === false) {
            wordIsValid = false

            break
        }
    }

    // [M3]
    if (wordIsValid === false) {
        throw new Error('invalid word')
    } else {
        // si es valida compararla con la palabra introducida (por el otro usuario). si coinciden poner aciertos en todo el progreso (true). si no poner attemps restantes a 0. [M4]

        if (attemptedWord === word)
            for (var i = 0; i < progress.length; i++)
                progress[i] = true
        else
            remainingAttemps = 0
    }
}

function resetGame() {
    word = ''
    remainingAttemps = 6
    progress = []
}

// PRESENTACION

/*
User
- introducir una palabra a adivinar (por el que propone la palabra) [U1]
- ver los espacios que puede rellenar (de la palbra, sus caracteres) y las oportunidades que tiene para adivinar esos espacios [U2]
- probar con una letra (adivinar si coincide con alguna de la palabra oculta) [U3]
- probar de adivinar la palabra entera [U4]
- volver a empezar [U5]
*/

// introducir una palabra a adivinar (por el que propone la palabra) [U1]
function introduceWord() {
    /*
    Maquina
    - pedir palabra al usuario (el que propone la palabra) [M1]
    - verificar que solo sean letras (en caso que no, informar al usuario) [M2]
    - guardar palabra para luego jugar [M3]
    */

    // [M1]

    var candidateWord = prompt('input a word')
    candidateWord = candidateWord.toLowerCase()

    // [M2]

    /*
    Maquina
    - pasar palabra candidata a minusculas
    - recorrer los caracteres de la palabra candidata y con ellos recorrer el alfabeto y verificar uno a uno si los encuentra en él (si hay un caracter que no lo encuentra, avisar al usuario que la palabra tiene un caracter no valido, y que vuelva a introducir una palabra)
    */

    try {
        keepGuessingWord(candidateWord)
    } catch (error) {
        alert(error.message)

        console.error(error)

        introduceWord()
    }
}

// ver los espacios que puede rellenar (de la palabra, sus caracteres) y las oportunidades que tiene para adivinar esos espacios [U2]
function viewGameStatus() {
    /*
    Maquina
    - iterar sobre el progress y mostrar caracter correspondiente de la palabra en la posicion donde haya un 1, y un guion donde haya un 0 [M1]
    - mostrar intentos que le quedan [M2]
    */

    try {
        var gameStatus = getGameStatus()

        console.log(gameStatus.status)

        console.log('you have ' + gameStatus.remainingAttemps + ' attemps')
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

// probar con una letra (adivinar si coincide con alguna de la palabra oculta) [U3]
function tryCharacter() {
    /*
    Maquina
    - comprobar intentos restantes. si quedan 0 intentos, alertamos al usuario de que no le quedan intentos y paramos aqui. de lo contrario operamos (continuamos) [M0]
    - comprobar si progress esta completado (todo a true, usuario ha adivinado la palabra). si progress lleno a true, entonces paramos aqui. de lo contrario continuamos. [M0B]
    - preguntar el caracter que quiere intentar el usuario [M1]
    - comprobar si caracter es valido (contra el alfabeto catalan-spanish-english) [M2]
    - si caracter no es valido, que vuelva a preguntar [M3]
    - comprobar si caracter esta en la palabra, entonces, guardar posicion encontrada en progress [M4]
    - si caracter no está en palabra, entonces decrementar intentos restantes [M5]
    */

    // [M0]

    try {
        var hasAttemps = hasRemainingAttemps()

        if (!hasAttemps) {
            alert('you have no more attemps')
        } else {
            var wordGuessed = hasGuessedWord()

            if (wordGuessed) {
                alert('word already guessed')
            } else {
                var attemptedCharacter = prompt('character?')
                attemptedCharacter = attemptedCharacter.toLowerCase()

                attemptCharacter(attemptedCharacter)
            }
        }
    } catch (error) {
        if (error.message === 'invalid character') {
            tryCharacter()
        } else {
            alert(error.message)

            console.error(error)
        }
    }
}

// - probar de adivinar la palabra entera [U4]
function tryWord() {
    /*
    Maquina
    - comprobar intentos restantes. si quedan 0 intentos, alertamos al usuario de que no le quedan intentos y paramos aqui. de lo contrario operamos (continuamos) [M0]
    - comprobar si progress esta completado (todo a true, usuario ha adivinado la palabra). si progress lleno a true, entonces paramos aqui. de lo contrario continuamos. [M0B]
    - pedir palabra al usuario [M1]
    - validar palabra (que tenga caracteres validos, cumpliendo con el alfabeto catalan-spanish-english) [M2]
    - si palabra no es valida, volver a pedir palabra [M3]
    - si es valida compararla con la palabra introducida (por el otro usuario). si coinciden poner aciertos en todo el progreso (true). si no poner attemps a 0. [M4]
    */
    try {
        var hasAttemps = hasRemainingAttemps()

        if (!hasAttemps) {
            alert('you have no more attemps')
        } else {
            var wordGuessed = hasGuessedWord()

            if (wordGuessed) {
                alert('word already guessed')
            } else {
                var attemptedWord = prompt('word?')
                attemptedWord = attemptedWord.toLowerCase()

                attemptWord(attemptedWord)
            }
        }
    } catch (error) {
        if (error.message === 'invalid word') {
            tryWord()
        } else {
            alert(error.message)

            console.error(error)
        }
    }
}

function playAgain() {
    /*
    Maquina
    - reiniciar variables
    */
    try {
        resetGame()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

// automate all process

/*
Maquina
- pedir palabra a adivinar al usuario [M0]
- bucle {
    - mostrar estado juego [M1]
    - pedir eleccion al usuario, letra o palabra? si es letra, entonces pedir letra; si es palabra, pedir palabra [M2]
    - comprobar si juego ha terminado (attemps === 0 o todos true en progess).  si juego terminado, mostrar estado juego, y preguntar al usuario si quiere volver a jugar? si quiere, entonces volver a empezar. si no mostrar un bye y terminar. si no hemos terminado, seguir jugando (volver a preguntar letra o palabra) [M3] 
}
*/

function startGame() {
    // M0
    introduceWord()

    // bucle
    function tryGuess() {
        // [M1]
        viewGameStatus()

        // [M2]
        var option = ''

        function chooseOption() {
            option = prompt('character (c) or word (w)?')
            option = option.toLowerCase()

            if (option !== 'c' && option !== 'w')
                chooseOption()
        }

        chooseOption()

        if (option === 'c')
            tryCharacter()
        else if (option === 'w')
            tryWord()

        // [M3]
        try {
            var hasAttemps = hasAttemps()
            var wordGuessed = hasGuessedWord()

            if (hasAttemps === 0 || wordGuessed === true) {
                viewGameStatus()

                var replay = confirm('play again?')

                if (replay === true) {
                    playAgain()
                    startGame()
                } else {
                    alert('bye')
                }
            } else
                tryGuess()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    tryGuess()
}

startGame()