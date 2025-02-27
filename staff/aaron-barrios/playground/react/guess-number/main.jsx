const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

const randomNumber = logic.randomNumber()

function App() {
    const [view, setView] = useState('game')
    const [status, setStatus] = useState(null)

    const handleGuessNumberSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { number: { value: number } } = form

            logic.sentNumber(Number(number))

            const status = logic.getStatus()
            setStatus(status)

            form.reset()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRestartClick = () => {
        try {
            logic.restart()

            setView('game')
            setStatus(null)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        {view === 'game' && <main>
            <h1>Hello, Guess Number!</h1>

            <form onSubmit={handleGuessNumberSubmit}>
                <label htmlFor="number">Guess Number</label>
                <br />
                <input type="text" id="number" />

                <br />
                <button type="submit">Try</button>
            </form>

            <br />

            {status && <>
                <p>Data</p>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <>{`temperature: ${status.temperature}`}</>
                    <>{`attempts: ${status.attempts}`}</>
                    <> {`attemptedNumbers: [${status.attemptedNumbers}]`}</>
                    <>{`won: ${status.won}`}</>
                    <>{`lost: ${status.lost}`}</>
                    <>{`gameOver: ${status.gameOver}`}</>

                </span>

                {status.won && <h2>You won!</h2>}

                {status.lost && <h2>You lost!</h2>}

                {status.gameOver && <button onClick={handleRestartClick}>Restart</button>}
            </>}
        </main>}
    </>
}
root.render(<App />)