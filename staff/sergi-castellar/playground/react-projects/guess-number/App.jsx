const {useState, useEffect} = React

function App() {
    const [status, setStatus] = useState({})
    //const [gameCount, setGameCount] = useState(1)

    useEffect(() => {
        if (Object.keys(status).length === 0) {
            logic.startGame()
            logic.generateRandom()
        }
    }, [status])

    const handleGuessingSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target
            const guessingNumber = Number(form['guessingNumber'].value)
    
            form.reset()
    
            logic.attemptNumber(guessingNumber)

            const status = logic.getStatus()

            setStatus(status)

        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handleRestartGameClick = () => {
        logic.resetGame()

        setStatus({})

        //setGameCount(prevGameCount => prevGameCount + 1)
    }

    const { remainingAttempts, roundSentence, hint } = status
    const isGameStarted = logic.helper.isGameStarted()
    const areStillPlaying = logic.helper.areWeStillPlaying()

    const alreadyTriedNumbers = logic.getTriedNumbers()
    const randomNumber = logic.helper.getRandomNumber()
    const isGameLost = logic.helper.isGameLost()

    return <>
        <h1>Guess number</h1>
        <h3>Game description Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ad enim quo possimus placeat optio consequatur, dolor officiis error aliquid animi in ratione nisi at, harum magni hic incidunt totam. Molestiae laborum quidem cumque, eos impedit harum iure doloribus quo sed, velit suscipit placeat ab nam quis vero qui et.</h3>
        {/* <h4>{`Game number ${gameCount}`}</h4> */}
        <form id='guessing-form' onSubmit={handleGuessingSubmit}>
            <label htmlFor='guessingNumber'>Try</label>
            <input type='number' id='guessingNumber' placeholder="Enter a number" />
            <button type="submit" form='guessing-form'>Try</button>
        </form>
        <p id='triedNumbers'>{isGameStarted ? `Numbers already tried: ${alreadyTriedNumbers}` : ''}</p>
        <p id='hint'>{areStillPlaying ? `${hint}` : ''}</p>
        <p id='remainingAttempts'>{isGameStarted ? `Remaining attempts: ${remainingAttempts}` : ''}</p>
        <p id='result'>{isGameStarted ? `${roundSentence}` : ''} {isGameLost ? `The number was: ${randomNumber}` : ''}</p>
        <button onClick={handleRestartGameClick}>Restart Game</button>
    </>
}