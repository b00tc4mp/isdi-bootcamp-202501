const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App() {
    const [view, setView] = useState('intro')
    const [status, setStatus] = useState('')
    const [feedback, setFeedback] = useState('')
    const [gameOver, setGameOver] = useState(false)
    const [attemptsLeft, setAttemptsLeft] = useState(data.constants.MAX_ATTEMPS)

    const handleStartSubmit = event => {
        event.preventDefault()
        const form = event.target
        const word = form.word.value

        try {
            logic.introduceWord(word)
            const status = logic.getStatus()
            setView('game')
            setStatus(status)
            setAttemptsLeft(data.constants.MAX_ATTEMPS)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleCharOrWordSubmit = event => {
        event.preventDefault()
        try {
            const { target: form } = event
            const { charOrWord: { value: charOrWord } } = form

            if (charOrWord.length === 1)
                logic.attemptCharacter(charOrWord)
            else
                logic.attemptWord(charOrWord)

            const status = logic.getStatus()
            setStatus(status)
            setAttemptsLeft(status.remainingAttemps)

            form.reset()

            const gameOver = logic.isGameOver()
            setFeedback(gameOver ? logic.isWon() ? 'You win!' : 'You lose' : 'Keep trying...')
            setGameOver(gameOver)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleRestartClick = () => {
        try {
            logic.resetGame()
            setView('intro')
            setStatus('')
            setFeedback('')
            setGameOver(false)
            setAttemptsLeft(data.constants.MAX_ATTEMPS)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return <>
        <h1>Hangman Game</h1>

        {view === "intro" &&
            <form onSubmit={handleStartSubmit}>
                <label htmlFor="word">Guess word?</label>
                <input type="text" name="word" id="word" />
                <button type="submit">Start</button>
            </form>}

        {view === 'game' && <>
            <p style={{ fontSize: '52px' }}>{status.status}</p>
            <p>Remaining attempts: {attemptsLeft}</p>

            {/* Imagen del ahorcado cambia con los intentos fallidos */}
            <img src={`/hangman-${6 - attemptsLeft}.jpg`} alt={`Hangman stage ${6 - attemptsLeft}`} width="200" />

            <form onSubmit={handleCharOrWordSubmit}>
                <label htmlFor="charOrWord">Char or Word?</label>
                <input type="text" name="charOrWord" id="charOrWord" />
                <button type="submit">Try</button>
            </form>

            <p>{feedback}</p>
            {gameOver && <button type="button" onClick={handleRestartClick}>Restart</button>}
        </>}
    </>
}

root.render(<App />)
