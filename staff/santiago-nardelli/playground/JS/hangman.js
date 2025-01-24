//Juego del ahorcado
// 1. Definir una palabra
var word = 'batman'
// 2. Definir un array de caracteres
var matches = []
// 3. Definir un contador de intentos
var attempts = 0
// 4. Definir un máximo de intentos
var maxAttempts = 6
// 5. Definir un carácter a adivinar como un string vacío
var guessCharacter = ''

// 1 Paso numero 1 mediante un for recorrer la palabra y agregar un guion bajo por cada letra
// convierto las posiciones del array a un _ por la lenght de la word
for (var i = 0; i < word.length; i++)
    matches[i] = '_'

// 1.1 Definir una función que imprima los caracteres a adivinar
// 1.2 Recorrer el array de caracteres y concatenarlos en un string
// 1.3 Imprimir el string en la consola
function printMatches() {
    // Inicializamos una variable vacía para almacenar el string que vamos a construir 
    // lo que buscamos aqui es pasar de un array  de "_ "_" "_"_" _" a un string "_ _ _ _ _"
    var matchesString = '';

    // Recorremos el array 'matches' que contiene los "_ "_" "_"_" _" y lo almacenamos en 'matchesString'
    for (var i = 0; i < matches.length; i++) {
        // Añadimos cada carácter del array 'matches' seguido de un espacio a 'matchesString'

        matchesString += matches[i] + ' ';//esto es lo que se va a imprimir en la consola
        // Ejemplo: si matches = ['_','_','_','_','_'] entonces matchesString = '_ _ _ _ _ '
    }

    // Imprimimos el string resultante en la consola
    console.log(matchesString);
}



// 2  mediante un prompt pedir al usuario que ingrese un caracter
function askCharacter() { 
    guessCharacter = prompt('Ingrese un carácter:');
    
}



// 3 mediante un for recorrer la palabra y comparar si el caracter ingresado por el usuario es igual a alguno de los caracteres de la palabra
// si es igual reemplazar el guion bajo por el caracter ingresado
function checkGuessCharacterMatches(){
    // Inicializamos una variable 'check' en false
    var check = false
    // Recorremos la palabra letra por letra
    for (var i = 0; i < word.length; i++) {
        // Si la letra de la palabra es igual al caracter ingresado por el usuario
        // Reemplazar el guión bajo por la letra en la misma posición
        // Cambiar el valor de 'check' a true 
        if(guessCharacter == word[i]){
            // Reemplazamos el guión bajo por la letra en la misma posición
            matches[i] = word[i]
            // Cambiamos el valor de 'check' a true
            check = true
            alert('Cathed')
        }
        
        
    }

   
    // Si 'check' es false, incrementamos el contador de intentos
    if (check=== false){
        alert('One life down')
        maxAttempts--
        
    }
}

function hasPlayerWon() {
    // Verificar si todos los caracteres de 'matches' coinciden con los de 'word'
    // Si todos los caracteres coinciden, retornar true
    for (var i = 0; i < word.length; i++) {
        // Si hay alguna letra que no coincida, retornar false
        // Si todas las letras coinciden, retornar true
        // Ejemplo: si matches = ['b','a','t','m','a','n'] y word = 'batman' entonces retornar true
        // Ejemplo: si matches = ['b','a','t','m','a','n'] y word = 'batmen' entonces retornar false 
        if (matches[i] !== word[i]) {
            return false;
        }
    }
    return true;
}


printMatches()
// Bucle principal del juego
//Mientras los attemps sean menores a maxAttempts
while(attempts < maxAttempts ){

    askCharacter()
    checkGuessCharacterMatches()
    printMatches()

    // Verificar si el jugador ha ganado
    if ( hasPlayerWon()) {
        console.log('¡Felicidades! Has adivinado la palabra.');
        break;
    }

    // Verificar si el jugador ha perdido
    if (attempts >= maxAttempts) {
        console.log('No tienes más intentos. La palabra era: ' + word);
        break;
    }
}

