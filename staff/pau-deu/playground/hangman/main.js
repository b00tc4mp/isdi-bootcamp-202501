console.clear()

var word = prompt("word?");
var matches = [];
var attemps = 0;
var maxAttemps = 6;
var guessCharacter = "";

// Inicializa las coincidencias con guiones bajos
for (var i = 0; i < word.length; i++) {
    matches[i] = "_";
}

function printMatches() {
    var matchesString = "";
    for (var i = 0; i < matches.length; i++) {
        matchesString += matches[i] + " ";
    }
    console.log(matchesString);
}

function askCharacter() {
    guessCharacter = prompt("Guess a character?");
}

function checkGuessCharacterMatches() {
    var checkMatch = false;
    // Verifica si el carácter adivinado está en la palabra
    for (var j = 0; j < word.length; j++) {
        if (word[j] === guessCharacter) {
            matches[j] = guessCharacter;  // Actualiza las coincidencias
            checkMatch = true;
        }
    }
    // Si no hay coincidencia, incrementa los intentos
    if (!checkMatch) {
        attemps++;
        console.log("Try again. Attempts: " + attemps);
    }
}

// Función para verificar si el jugador ha ganado
function win() {
    var isWin = true;
    // Verifica si todas las letras han sido adivinadas correctamente
    for (var r = 0; r < word.length; r++) {
        if (matches[r] !== word[r]) {
            isWin = false;
            break;
        }
    }
    // Si todas las letras coinciden, el jugador ha ganado
    if (isWin) {
        alert("You won!");
        return true; // Devuelve `true` para indicar que se ganó
    }
    return false; // Devuelve `false` si no se ha ganado
}

function gameLoop() {
    printMatches();  // Muestra el estado actual de las coincidencias

    // Bucle del juego: si no has alcanzado los intentos máximos
    while (attemps < maxAttemps) {
        askCharacter();  // Pide al jugador un carácter
        if (guessCharacter === "" || guessCharacter === null) {
            throw new Error("Game canceled by user.");
        }

        checkGuessCharacterMatches();  // Verifica si la letra adivinada es correcta

        // Verifica si el jugador ha ganado después de cada intento
        if (win()) {
            break; // Si ha ganado, rompe el bucle y termina el juego
        }

        printMatches();  // Imprime las coincidencias después de cada intento

        if (attemps === maxAttemps) {
            alert("You lost! Try again next time.");
            break;  // Si alcanza el número máximo de intentos, termina el juego
        }
    }
}

// Inicia el juego
gameLoop();
