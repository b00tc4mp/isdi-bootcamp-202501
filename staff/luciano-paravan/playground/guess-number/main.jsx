const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const useState = React.useState

function GuessNumber () {
    const [view, setView] = useState('intro')
    const [status, setStatus] = useState({})
    
    const handleStartGame = () => {
        try {
            logic.initializeNumberToGuess()

            setView('game')
            console.log(data.numberToGuess)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleTryNumberSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const { guessedNumber: { value: nnumber }  } = form
        
        try {
            logic.tryNumber(nnumber)

            const status = logic.getStatus()
            
            setStatus(status)

            setView('gameStatus')

            form.reset()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRestartGame = () => {
        try {
            logic.resetGame()

            setView('intro')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <> <h1>Guess Number</h1>
    {view === 'intro' && <>
    <button onClick={handleStartGame}>Start game</button></>}
    {view === 'game' && <form onSubmit={handleTryNumberSubmit}>
        <label htmlFor="guessedNumber">Guess number</label>
        <input type="number" name="guessedNumber" id="guessedNumber"/>

        <button type="submit">Try</button>
    </form>}


    {view === 'gameStatus' && <>

        <form onSubmit={handleTryNumberSubmit}>
            <label htmlFor="guessedNumber">Guess number</label>
            <input type="number" name="guessedNumber" id="guessedNumber"/>

            <button type="submit">Try</button>
        </form>

        <p>Temperature: {status.temperature}</p>
        <p>Attempts: {status.attempts}</p>
        <p>Attempted numbers: {status.attemptedNumbers}</p>
        <p>{status.lose ? 'Looser!' : status.won ? 'Winner!' : 'Keep trying!'}</p>
        <button onClick={handleRestartGame}>Restart</button>
    </>}
    
    </>
}

root.render(<GuessNumber />)