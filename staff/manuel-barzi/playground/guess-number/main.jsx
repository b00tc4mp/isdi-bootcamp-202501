const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App() {
    const [view, setView] = useState('start')
    const [status, setStatus] = useState(null)

    const handleStartClick = () => {
        try {
            logic.initializeNumberToGuess()

            setView('play')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleNumberSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { number: { value: number } } = form

            logic.tryNumber(Number(number))

            const status = logic.getStatus()
            setStatus(status)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRestartClick = () => {
        try {
            logic.reset()

            setView('start')
            setStatus(null)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        {view === 'start' && <button onClick={handleStartClick}>Start</button>}

        {view === 'play' && <>
            <form onSubmit={handleNumberSubmit}>
                <label htmlFor="number">Number?</label>
                <input type="number" id="number" />

                <button type="submit">Try</button>
            </form>

            {status && <>
                <p>{`temperate ${status.temperature}, attempts ${status.attempts}, attemptedNumbers ${status.attemptedNumbers}, won ${status.won}, lost ${status.lost}, gameOver ${status.gameOver}`}</p>

                {status.won && <h2>YOu, wON!</h2>}

                {status.lost && <h2>YOU, LOSEEER!!</h2>}

                {status.gameOver && <button onClick={handleRestartClick}>Restart</button>}
            </>}
        </>}
    </>
}

root.render(<App />)