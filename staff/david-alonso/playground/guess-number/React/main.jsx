const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function GuessNumberGame() {

    // *** USAR EL "VIEW" PARA CAMBIAR DE PANTALLAS
    // *** 1- START
    // *** 2- GAME
    // *** 3- WIN O GAME-OVER
    // *** 4- RESTART

    // *** CREAR "GUARDAR NUMEROS" DE LOS NUMEROS INTRODUCIDOS

    // *** CREAR "RESTART"

    // *** VALORAR QUE MOSTRAR CON EL "STATUS"

    // *** "USEEFECT" ??


    // Generamos un numero al azar
    const [randomNumber] = useState(Math.floor(Math.random() * 100 + 1))
    // Contar numero de intentos = "setAttemts" para acualizar los intentos
    const [attempts, setAttempts] = useState(0)
    // Numero maximo de intentos
    const maxAttempts = 10
    // setMessage = mensaje para el usuario
    const [message, setMessage] = useState("Adivina el número del 0 al 100")
    // setInputValue = actualiza el estado cuando el usuario escriba en el input
    const [inputValue, setInputValue] = useState("");

    // ompronbamos la diferencia
    const checkDifference = (number) => {
        const difference = Math.abs(number - randomNumber);
        if (difference > 50) return "very cold 🧊🧊"
        if (difference >= 30) return "cold 🥶"
        if (difference >= 20) return "tempered 😅"
        if (difference >= 10) return "warm ♨️"
        if (difference >= 5) return "hot 🥵"
        return "very hot 🔥🔥🔥"
    };

    // 
    const handleGuess = () => {

        // Convertimos el numero a entero
        const number = parseInt(inputValue)
        // Comprueba que el numero sea de 0 a 100
        if (isNaN(number) || number < 0 || number > 100) {
            // Si no manda mensage al usuario
            setMessage("Por favor ingresa un número válido entre 0 y 100.")
            return
        }

        // Gestionamos los intentos sumando 1
        setAttempts(attempts + 1)
        // Comprobamos si es el numero correcto
        if (number === randomNumber) {
            setMessage("¡Felicidades! Has adivinado el número 🎉")

        } else {
            // Comprobamos si quedan intentos, si no avisamos que ha perdido
            if (attempts + 1 >= maxAttempts) {
                setMessage(`Perdiste. El número era ${randomNumber}`)

                // Comprobamos la diferenca
            } else {
                setMessage(`${checkDifference(number)}. Intentos restantes: ${maxAttempts - (attempts + 1)}`)
            }
        }
    }

    // Lo que se muestra por pantalla
    return (
        <div >
            <h1>Guess Number ❓</h1>
            <p>{message}</p>
            {attempts < maxAttempts && (
                <div>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} />
                    <button onClick={handleGuess}>Adivinar</button>
                </div>
            )}
            {attempts >= maxAttempts && <p>Game Over 😢</p>}  {/* AÑADIR BOTON RESTART */}
        </div>
    )
}

// Renderizamos el juego
root.render(<GuessNumberGame />)
