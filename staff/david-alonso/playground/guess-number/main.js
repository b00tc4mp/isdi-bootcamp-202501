// Usuario 
// - introducir un numero a adivinar del 0 al 100 
const data = {

    // - generar un numero aleatorio del 0 al 100
    RANDOM_NUMBER: Math.floor(Math.random() * 100 + 1),
    // console.log(data.randomNumber)

    // - numero maximos de intentos 10
    ATTEMPS: 0,

    MAX_ATTEMPS: 10,

}

const logic = {

    // Función para comprobar si el número es el correcto
    guessNumber(number) {

        if (isNaN(number)) {
            alert('Por favor ingresa un número válido.')
        } else if (number === data.RANDOM_NUMBER) {
            alert('¡Felicidades! Has adivinado el número')
            return
        } else {
            logic.checkDifference(number)
        }
    },

    // Función para comprobar la diferencia
    checkDifference(number) {
        // comprobar diferencia del numero del usuario 
        // var diferencia = Math.abs(number - randomNumber)
        const difference = (number > data.RANDOM_NUMBER) ? number - data.RANDOM_NUMBER : data.RANDOM_NUMBER - number

        // varios niveles de diferencias con el numero del usuario
        if (difference > 50) {
            alert('very cold 🧊🧊')
        } else if (difference >= 30 && difference < 50) {
            alert('cold 🥶')
        } else if (difference < 30 && difference >= 20) {
            alert('tempered 😅')
        } else if (difference < 20 && difference >= 10) {
            alert('warm ♨️')
        } else if (difference < 10 && difference >= 5) {
            alert('hot 🥵')
        } else if (difference < 5 && difference >= 1) {
            alert('very hot 🔥🔥🔥')
        }

        confirm('Te quedan ' + --data.MAX_ATTEMPS + ' intentos')
        // resta 1 intento cuando no acierta el numero el usuario

        interface.askNumber()
        // Pedir un nuevo intento después de cada verificación
    }
}

const interface = {

    // - comenzar el juego 
    startGame() {
        // Solicitar el primer intento
        interface.askNumber()
        // llamamos a la funcion para pedir el numero al usuario
    },

    // - pedir el numero al usuario 
    askNumber() {

        // - si los intentos son menores que el numero maximo de intentos y si no es 
        // el numero del usuario 
        if (data.ATTEMPS < data.MAX_ATTEMPS) {
            const number = parseInt(prompt('ADIVINA EL NUMERO DEL 0 AL 100 ❓❓'))

            logic.guessNumber(number)
        } else {
            alert('Perdiste. El número era ' + data.RANDOM_NUMBER)
        }
    }
}

interface.startGame()