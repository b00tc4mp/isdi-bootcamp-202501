console.clear()

var word = prompt ('Please, insert a new word')
var matches = []

/* bucle for para que recorre toda la parabra introducida y le asigne al array matches
tantos ' _ ' como letras tenga la palabra
*/
for (var i = 0; i < word.length; i++)
    matches[i] = ' _ '

var attempts = 0
var maxAttempts = 10
var guessCharacter = ''

/* Función printMatches: recorre el array matches y construye un string con letras 
adivinadas o guiones e imprime la evolución del juego.
*/

function printMatches() {
    var matchesString = ''

    for (var i = 0; i < matches.length; i++)
        matchesString += matches[i] 
        console.log(matchesString)
}

//Función para preguntar al jugador una letra
function askCharacter() {
    guessCharacter = prompt('insert a letter')    
}

/*Función para chequear si la letra coincide con alguna de la palabra. En el caso que si, 
imprime una felicitación, en el caso que no imprime un 'sigue intentandolo' y aumenta los intentos.
*/
function checkGuessCharacterMatches() {
    var foundLetter = false

    for( var i = 0; i < word.length; i++) {
        if(word[i] === guessCharacter) {
            matches[i] = guessCharacter
            foundLetter = true
            console.log('Good job! Keep doing it like this.')
        }
    }
    if(!foundLetter) {
        attempts++
        console.log('Ups! Keep trying. You still have ' + (maxAttempts - attempts) + ' attempts.')
    }
}

/* Función youWon: recorre el array de matches para verificar si quedan guiones. Si alguna posición
de matches sigue siendo un guión, devuelve false y el juego continúa. En el caso contrario, imprime
mensaje de victoria y devuelve true.
*/
function youWon() {

    for( var i = 0; i < matches.length; i++) {
        if(matches[i] === ' _ ') {
            return false
        }
    }
    console.log('Congratulations! You won the game. The word is ' + word)
    return true

}

/* Función youLost: verifica si el número de intentos ha alcanzado el máximo. Si es así, 
muestra el mensaje de derrota y devuelve true. Si no, devuelve false.
*/
function youLost() {
    if (attempts === maxAttempts) {
        console.log('Game Over. You do not have more attempts. Try again')
        return true
    }
    return false   
}

/* While: este ciclo ejecuta el juego mientras haya intentos. Mostrará las letras
adivinadas (printMatches()). Si has ganado, rompe el juego. Si no, sigue preguntando
letra y chequeandola, hasta que pierdas.
*/
while (attempts < maxAttempts) {
    printMatches()

    if (youWon()) 
        break

    askCharacter()
    checkGuessCharacterMatches()
    
    if (youLost())
        break
}
