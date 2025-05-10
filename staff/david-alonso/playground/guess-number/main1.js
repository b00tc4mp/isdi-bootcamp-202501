//  Usuario 
// - introducir un numero a adivinar del 0 al 100 

// Maquina
// - generar un numero aleatorio del 0 al 100
var randomNumber = Math.floor(Math.random() * 100 + 1)
console.log(randomNumber)

// - numero maximos de intentos 10
var attempts = 0
var maxAttempts = 10
// dar valor al numero del usuario
var numberUser = false

// - comenzar el juego 
function startGame() {
    // Solicitar el primer intento
    pedirIntento()
    // llamamos a la funcion para pedir el numero al usuario
}

// - pedir el numero al usuario 
function pedirIntento() {

    // - si los intentos son menores que el numero maximo de intentos y si no es 
    // el numero del usuario 
    if (attempts < maxAttempts && !numberUser) {
        var number = parseInt(prompt('ADIVINA EL NUMERO DEL 0 AL 100 ❓❓'))

        adivinarNumero(number)
    } else if (!numberUser) {
        alert('Perdiste. El número era ' + randomNumber)
    }
}

// Función para comprobar si el número es el correcto
function adivinarNumero(number) {

    if (isNaN(number)) {
        alert('Por favor ingresa un número válido.')
    } else if (number === randomNumber) {
        alert('¡Felicidades! Has adivinado el número')
        return
    } else {
        comprobarDiferencia(number)
    }
}

// Función para comprobar la diferencia
function comprobarDiferencia(number) {
    // comprobar diferencia del numero del usuario 
    // var diferencia = Math.abs(number - randomNumber)
    var diferencia = (number > randomNumber) ? number - randomNumber : randomNumber - number

    // varios niveles de diferencias con el numero del usuario
    if (diferencia > 50) {
        alert('very cold 🧊🧊')
    } else if (diferencia >= 30 && diferencia < 50) {
        alert('cold 🥶')
    } else if (diferencia < 30 && diferencia >= 20) {
        alert('tempered 😅')
    } else if (diferencia < 20 && diferencia >= 10) {
        alert('warm ♨️')
    } else if (diferencia < 10 && diferencia >= 5) {
        alert('hot 🥵')
    } else if (diferencia < 5 && diferencia >= 2) {
        alert('very hot 🔥🔥')
    } else if (diferencia < 1) {
        alert('super hot 🔥🔥🔥🔥')
    }

    prompt('Te quedan ' + --maxAttempts + ' intentos')
    // resta 1 intento cuando no acierta el numero el usuario

    if (!numberUser) {
        pedirIntento()
        // Pedir un nuevo intento después de cada verificación
    }
}
//  TODO Crear un Restart
startGame()
