// MAIN

const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App() {




    const handleStartSubmit = event => {
        event.preventDefault()

        try {



        } catch (error) {
            console.error(error)

            alert(error.message)
        }



    }

    // - comenzar el juego 
    startGame() {
        // Solicitar el primer intento
        interface.askNumber()
        // llamamos a la funcion para pedir el numero al usuario
    }

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