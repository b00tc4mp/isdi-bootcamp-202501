// REACT JSX PARA HANGMAN
// Creo elemento root de react
const root = ReactDOM.createRoot(document.getElementById('root'))

// Creo elemento useState de react
const { useState } = React

function App(){
    // DOM REAL
    const [view, setView] = useState('intro') // Inicializo el setStatus de view en la intro
    const [status, setStatus] = useState('') // Inicializo el status en vacio
    const [feedback, setFeedback] = useState('')
    const [gameOver, setGameOver] = useState(false)

    // Submit para poner Palabra
    const handleStartSubmit = event => {
        event.preventDefault()
        // Creo formulario
        const form = event.target
        // Obtengo la palabra del formulario
        const word = form.word.value

        try{
            logic.introduceWord(word) // Llamo a la logica de introducir palabra

            const status = logic.getStatus() // Llamo a la logica de status y la guardo en una variable

            setView('game')
            setStatus(status) // Cambio el estado del setStatus mediante la variable de la linea 23
        } catch (error){
            console.error(error)

            alert(error.message)
        }
    }

    // Submit para intentar letra o palabra
    const handleCharOrWordSubmit = event =>{
        event.preventDefault()

        try{
            //creo el form, no es necesario pero aqui esta en formato desestructurizado
            const { target: form } = event

            const { charOrWord: {value: charOrWord}} = form

            if(charOrWord.length === 1)
                logic.attemptCharacter(charOrWord)
            else if(charOrWord.lenght > 1)
                logic.attemptWord(charOrWord)
            
            const status = logic.getStatus()

            setStatus(status)

            form.reset()

            const gameOver = logic.isGameOver()

            setFeedback(gameOver ? logic.isWon() ? 'You win!' : 'You lose' : 'Keep trying...')
            setGameOver(gameOver)
        } catch(error){
            console.error(error)

            alert(error.message)
        }
    }

    const handleRestartClick = () => {
        try{
            logic.resetGame()

            setView('intro')
            setStatus('')
            setFeedback('')
            setGameOver(false)
        } catch (error){
            console.error(error)

            alert(error.message)
        }
    }

    // DOM VIRTUAL
    return<> 
        <h1>Hello, Hangman!</h1>

        { view === "intro" && <form onSubmit = {handleStartSubmit}>
            <label htmlFor="word">Guess world?</label>
            <input type="text" name="word" id="word"/>
            <button type = "submit">Start</button>
        </form>}

        {view === 'game' &&<>
            <p style = {{ fontSyze: '52px'}}>{status.status}</p>
            <p>Remaining attemps: {status.remainingAttemps}</p>

            <form onSubmit={handleCharOrWordSubmit}>
                <label htmlFor="charOrWord">Char or Word?</label>
                <input type="text" name="charOrWord" id="charOrWord"/>
                <button type="submit">Try</button>
            </form>

            <p>{feedback}</p>
            {gameOver && <button type="button" onClick={handleRestartClick}>Restart</button>}
        </>}
    </>
}

root.render(<App />)