// LOGIC

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
