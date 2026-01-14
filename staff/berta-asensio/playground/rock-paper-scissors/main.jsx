const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App() {
    const [view, setView] = useState ('start')
    const [playerChoice, setPlayerChoice] = useState(null)
    const [pcChoice, setPcChoice] = useState(null)
    const [status, setStatus] = useState(null)
    const [gameStatus, setGameStatus] = useState(null)
    const [rounds, setRounds] = useState([])

    const handleStartClick = () => {
        setView('play')
        setRounds([])
       // setStatus(null)
        //setGameStatus(null)
        //data.counterPlayer = 0
        //logic.resetGame()
    }

    const handlePlayClick = (choice) => {
        setPlayerChoice(choice)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(!playerChoice) {
            alert ("Please select an option before playing!")
            return
        }
        try {
            logic.pcOptions()
            setPcChoice(data.pcChoice)

            logic.playerOptions(playerChoice)

            const roundStatus = logic.getStatus()
            setStatus(roundStatus)

            const roundResult = {
                playerChoice,
                pcChoice: data.pcChoice, 
                result: roundStatus
            }

            setRounds((prevRounds) => [...prevRounds, roundResult])

            const finalResult = logic.finalGame()
            if(finalResult) {
                setGameStatus(finalResult)
                setView('end')
            } else {
                setView('play')
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        {view === 'start' && <>
            <h1>ROCK, PAPER, SCISSORS</h1>
            <br />
            <h2>Do you want to play?</h2>
            <br />
            <p>Remember de rules:<br />
                -Rock wins scissors.<br />
                -Paper wins rock.<br />
                -Scissors wins paper.<br />
                You have to win 3 rounds!
            </p>
            <br />
            <button onClick={handleStartClick}>Start</button>
        </>}

        {view === 'play' && <>
            <h2>Choose your option:</h2>

            <div>
                <button onClick={()=> handlePlayClick('rock')}>ROCK🧱</button>
                <button onClick={()=> handlePlayClick('paper')}>PAPER📋</button>
                <button onClick={()=> handlePlayClick('scissors')}>SCISSORS✂</button>
            </div>

            <p>Selected: {playerChoice ? playerChoice : "None"}
            </p>

            <form onSubmit={handleSubmit}>
                <button type="submit">PLAY!</button>
            </form>

            {status && <p>Round result: {status}</p>}
            <p>Score: Player {data.counterPlayer} - PC {data.counterPc}</p>
        </>}

        {view === 'end' && (
            <>
                <h2>Game Over!</h2>
                <p>{gameStatus === "WIN" ? "You won the game!🎉" : gameStatus === "LOST" ? "You lost the game! 😭" : "It's a tie! Try again."}</p>
                <h3>Rounds played:</h3>
                <ul>
                    {rounds.map((round, index) => (
                        <li key={index}>
                            Round {index + 1}: Player chose {round.playerChoice}, PC chose {round.pcChoice}. Result: {round.result}
                        </li>
                    ))}
                </ul>
                <button onClick={() => setView('start')}>Play again</button>
            </>
        )}
    </>
}





root.render(<App />)