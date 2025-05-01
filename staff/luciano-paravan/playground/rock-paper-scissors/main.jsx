const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState, useEffect } = React

function App() {
    const [view, setView] = useState('intro')
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true)
    const [displayStatus, setDisplayStatus] = useState(false)
    const [status, setStatus] = useState()

    const handleStartGameSubmit = event => {
        event.preventDefault()

        const { target: form } = event
        const { numberOfGames: { value: number }  } = form

        try {
            logic.roundsNumber(number)
            
            setView('gameStart')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    useEffect (() => {
        const status = logic.getStatus()
        setStatus(status)
    }, [isPlayer1Turn])

    const handleRPS = (numberPlayed) => {
        try {
            if(logic.isGameOver()) {
                //setView('intro')
                //logic.restartGame()
                return
            }

            logic.setChoice(numberPlayed, isPlayer1Turn)
            
            if (!isPlayer1Turn) {
                logic.setRoundWinner()
                logic.isGameOver()
            }
            setIsPlayer1Turn(!isPlayer1Turn)
            setDisplayStatus(true)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRestartButton = () => {
        try {
            logic.restartGame()
            setView('intro')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>

        <h1>ROCK, PAPER, SCISSORS</h1>
        {view === 'intro' && <>
        <form onSubmit={handleStartGameSubmit}>
            <label htmlFor="numberOfGames">How many games do you wanna play?</label>
            <input type="number" name="numberOfGames" id="numberOfGames" />
            <button type="submit">Start game</button>
        </form>
        </>}

        {view === 'gameStart' && <>
            <h3>Player number {isPlayer1Turn ? '1' : '2'} turn</h3>
            <button onClick={() => handleRPS('1')}>🪨</button>
            <button onClick={() => handleRPS('2')}>🧻</button>
            <button onClick={() => handleRPS('3')}>✂️</button>
            {displayStatus && 
                <><p>You will play {status.roundsNumber} rounds.</p>
                {/*<p>Rounds history:{status.rounds}</p>*/}
                <p>Games won by player 1: {status.numberOfGamesWonBy1}</p>
                <p>Games won by player 2: {status.numberOfGamesWonBy2}</p>
                <p>{status.gameOver ? `The winner is player ${status.winner} \n - RESTART GAME` : 'Keep playing'}</p>
                <button onClick={handleRestartButton}>Restart</button>
                </>
            }
            </>
        }
        
    </>
}

root.render(<App />)