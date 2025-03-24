const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App() {
    const [view, setView] = useState('intro')
    const [status, setStatus] = useState('')
    const [feedback, setFeedback] = useState('')
    const [gameOver, setGameOver] = useState('')

    const handleStartSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target

            const word = form.word.value

            logic.introduceWord(word)

            const status = logic.getStatus()

            setView('game')
            setStatus(status)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCharorWordSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { charOrWord: { value: charOrWord } } = form

            if (charOrWord.length === 1)
                logic.attemptCharacter(charOrWord)
            else if (charOrWord.length > 1)
                logic.attemptWord(charOrWord)

            const status = logic.getStatus()

            setStatus(status)

            form.reset()

            const gameOver = logic.isGameOver()

            setFeedback(gameOver ? logic.isWon() ? 'you win!' : 'you lose' : 'Keep trying...')
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
            setGameOver('false')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        <h1>Hangman!</h1>

        {view === 'intro' && <form onSubmit={handleStartSubmit}>
            <label htmlFor="word">Send target word</label>
            <input type="text" name="word" id="word" />
            <button type="submit">Start</button>
        </form>}

        {view === 'game' && <>
            <p style={{ fontSize: '52px' }}>{status.status}</p>

            <p>Remaining attempts: {status.remainingAttempts}</p>

            <form onSubmit={handleCharorWordSubmit}>
                <label htmlFor="charOrWord">Char or Word?</label>
                <input type="text" name="charOrWord" id="charOrWord" />
                <button type="submit">Try</button>
            </form>

            <p>{feedback}</p>

            {gameOver && <button type="button" onClick={handleRestartClick}> Restart</button>}
        </>}

    </>
}

root.render(<App />)