const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App(){
      /*
        - Generar numero aleatorio, guardarlo en data
        - Recoger numero input formulario
        - Llamar logica checkNumber
        - ordenar numeros.
        - si falla , checkear diferencia y cambiar el feedback, sumar attempts
        -
        */ 
    
    const [view, setView] = useState('game')
    const [feedback, setFeedback] = useState('')
    const [diferrence, setDiferrence] = useState('')
    const [gameOver, setGameOver] = useState(false)
   
    // generamos numero aleatorio si no hay intentos
    if(data.constant.attempts === 0) logic.generateRandomNumber()
    // Hook para cuando el usuario le de a intentar numero
    const handleTrySubmit = event => {
        event.preventDefault()
       
        try {
           // 1. comprobar numero (checkNumber)
           // 2. ordenar numero (numberSort)
           // 3. comprobar diferencia (checkRest)
           // 4. comprobar si hemos pasado los intentos (checkAttemps)
           // 5. insertar numero probadp en array (numbersTriedFunction)
           // 6. reseteamos form
           // 7. mensaje para usuario si esta cerca del numero y cambiamos usestate
           // 8. ternario, si no hemos ganado o no hemos pasado los intentos 'keep trying', si ganamos 'you win', si perdemos 'you loose'
           // 9. comrpobamos si el juego se ha acabado y cambiamos usestatte

            const { target: form } = event

            const { number: { value: playerNumber } } = form

            // 1
            logic.checkNumber(playerNumber)
            // 2
            logic.numberSort(playerNumber)
            // 3
            logic.checkRest(playerNumber)
            // 4
            logic.checkAttempts()
            // 5
            logic.numbersTriedFunction(playerNumber)
            // 6
            form.reset()
            // 7
            const diferrence = logic.checkRest()
            setDiferrence(diferrence)
            // 8
            const gameOver = logic.isGameOver()
            setFeedback(gameOver ? logic.isWon() ? 'You win! 😊🏆' : 'You loose! ☹️' : 'Keep trying... 🤔')
            // 9
            setGameOver(gameOver)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    
    const handleRestartClick = () => {
        try {
            logic.resetGame()

            setView('game')
            setFeedback('')
            setDiferrence('')
            setGameOver(false)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        <h1>Guess the number!!</h1>
        
        {view === 'game' && <>
            
            <form onSubmit={handleTrySubmit}>
            <label htmlFor="number">Guess number?  </label>
            <input type="number" name="number" id="number" />
            <button type="submit">TRY!</button>
            </form>

            <p>{feedback}</p>
            <p>{diferrence}</p>

            
            {gameOver && <button onClick={handleRestartClick}>Restart</button>}
        </>}


    
    </>
}

root.render(<App />)