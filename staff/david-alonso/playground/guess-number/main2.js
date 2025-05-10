// Usuario 
// - introducir un numero a adivinar del 0 al 100 
var data = {}
var logic = {}
var interface = {}

// Maquina
// - generar un numero aleatorio del 0 al 100
data.randomNumber = Math.floor(Math.random() * 100 + 1)
console.log(data.randomNumber)

// - numero maximos de intentos 10
data.attempts = 0
data.maxAttempts = 10
// dar valor al numero del usuario
data.numberUser = false

// - comenzar el juego 
interface.startGame = function () {
    // Solicitar el primer intento
    interface.pedirIntento()
    // llamamos a la funcion para pedir el numero al usuario
}

// - pedir el numero al usuario 
interface.pedirIntento = function () {

    // - si los intentos son menores que el numero maximo de intentos y si no es 
    // el numero del usuario 
    if (data.attempts < data.maxAttempts && !data.numberUser) {
        var number = parseInt(prompt('ADIVINA EL NUMERO DEL 0 AL 100 ❓❓'))

        logic.adivinarNumero(number)
    } else if (!data.numberUser) {
        alert('Perdiste. El número era ' + data.randomNumber)
    }
}

// Función para comprobar si el número es el correcto
logic.adivinarNumero = function (number) {

    if (isNaN(number)) {
        alert('Por favor ingresa un número válido.')
    } else if (number === data.randomNumber) {
        alert('¡Felicidades! Has adivinado el número')
        return
    } else {
        logic.comprobarDiferencia(number)
    }
}

// Función para comprobar la diferencia
logic.comprobarDiferencia = function (number) {
    // comprobar diferencia del numero del usuario 
    // var diferencia = Math.abs(number - randomNumber)
    var diferencia = (number > data.randomNumber) ? number - data.randomNumber : data.randomNumber - number

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
    } else if (diferencia < 5 && diferencia >= 1) {
        alert('very hot 🔥🔥🔥')
    }

    prompt('Te quedan ' + --data.maxAttempts + ' intentos')
    // resta 1 intento cuando no acierta el numero el usuario

    if (!data.numberUser) {
        interface.pedirIntento()
        // Pedir un nuevo intento después de cada verificación
    }
}

interface.startGame()
