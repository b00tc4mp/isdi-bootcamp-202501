const {useState, useEffect} = React

function App() {
    const [view, setView] = useState('pre-game')
    const [roundStatus, setRoundStatus] = useState({       
        computerPlay: '',
        userPlay: '',
        currentRoundWinner: '',
        roundWinningSentence: ''
    })
    const [overallStatus, setOverallStatus] = useState({
        gamesWonComputer: 0,
        gamesWonPlayer: 0,
        gamesDrawn: 0,
        overallWinner: '',
        overallWinningSentence: ''        
    })
    const [gameStatus, setGameStatus] = useState({
        endOfRounds: false,
        started: false,
        totalRounds: 0,
        playedRounds: 0
    })

    useEffect(() => {
        if (gameStatus.started && gameStatus.endOfRounds) {
                const overallWinner = logic.getOverallWinner()
                const overallWinningSentence = logic.setWinnerOverallSentence(overallWinner)
                
                setOverallStatus({...overallStatus, overallWinner: overallWinner, overallWinningSentence: overallWinningSentence})
            }
    }, [gameStatus])

    const handleSelectRoundsSubmit = event => {
        event.preventDefault()
        
        try {
            const { target: form } = event
            let { roundsNumber: { value: roundsNumber } } = form
            roundsNumber = Number(roundsNumber)
            console.log(event.target.roundsnumber, roundsNumber)
            
            form.reset()
            
            logic.setRounds(roundsNumber)
            setGameStatus({...gameStatus, started: true, totalRounds: roundsNumber})
            
            setView('during-game')
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handleMakePlayClick = (playerPlay) => {
        try {
            if (gameStatus.started && !gameStatus.endOfRounds) {
                const computerPlay = logic.generateComputerPlay()
    
                logic.setPlayerPlay(playerPlay)

                const roundWinner = logic.setRoundWinner()
                
                const roundWinningSentence = logic.selectWinnerRoundSentence(roundWinner)
                
                setRoundStatus({
                    computerPlay: computerPlay,
                    userPlay: playerPlay,
                    currentRoundWinner: roundWinner,
                    roundWinningSentence: roundWinningSentence
                })
                
                const { gamesWonComputer: gamesWonComputer, gamesWonPlayer: gamesWonPlayer, gamesDrawn: gamesDrawn, playedRounds: playedRounds } = logic.increaseWinningCount()

                //const {} = 

                setOverallStatus({
                    ...overallStatus,
                    gamesWonComputer: gamesWonComputer,
                    gamesWonPlayer: gamesWonPlayer,
                    gamesDrawn: gamesDrawn 
                })

                setGameStatus({
                    ...gameStatus, playedRounds: playedRounds
                })

                const {} = gameStatus
                if (totalRounds === playedRounds)
                    setGameStatus({...gameStatus, endOfRounds: true})
            }
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handleRestartGameClick = () => {
        data = {
            computerPlay: '',
            userPlay: '',
            gamesWonComputer: 0,
            gamesWonPlayer: 0,
            gamesDrawn: 0,
            totalRounds: 0,
            playedRounds: 0,
            currentRoundWinner: ''
        }

        setGameStatus({})
        setView('pre-game')
    }

    const { computerPlay, userPlay, currentRoundWinner, roundWinningSentence } = roundStatus

    const { gamesWonComputer, gamesWonPlayer, gamesDrawn, overallWinner, overallWinningSentence } = overallStatus

    const { totalRounds, playedRounds } = gameStatus
    
    const playerPlayImg = userPlay ? `./assets/${userPlay}.png` : ''
    const computerPlayImg = computerPlay ? `./assets/${computerPlay}.png` : ''
    const currentRoundWinnerImg = currentRoundWinner ? `./assets/${currentRoundWinner}.png` : ''

    return <>
        <h1>Rock-paper-scissors</h1>
        <h3>Game description Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ad enim quo possimus placeat optio consequatur, dolor officiis error aliquid animi in ratione nisi at, harum magni hic incidunt totam. Molestiae laborum quidem cumque, eos impedit harum iure doloribus quo sed, velit suscipit placeat ab nam quis vero qui et.</h3>
        
        {view === 'pre-game' && <form id='rounds-form' onSubmit={handleSelectRoundsSubmit}>
            <label htmlFor='roundsNumber'>Number of rounds: </label>
            <input type='number' min='1' id='roundsNumber' placeholder="Enter a number" />
            <button type="submit" form='rounds-form'>Select</button>
        </form>}

        {view === 'during-game' && <section>
            {!gameStatus.endOfRounds && gameStatus.started && <>
            <h3>Select your play</h3>
            <div>
                <button className="rock" onClick={() => handleMakePlayClick('rock')}>
                    <img src={data.constant.ROCK_SRC} width="50px" />
                </button>
                <button className="paper" onClick={() => handleMakePlayClick('paper')}>
                    <img src={data.constant.PAPER_SRC}
                     width="50px" />
                </button>
                <button className="scissors" onClick={() => handleMakePlayClick('scissors')}>
                    <img src={data.constant.SCISSORS_SRC} width="50px" />
                </button>
            </div>
            </>}
            <div>
                <img width="140px" src={playerPlayImg}/>
                <img width="100px" src={currentRoundWinnerImg}/>
                <img width="140px" src={computerPlayImg}/> 
            </div>
            <div>
                <p>{roundWinningSentence}</p>
                {!gameStatus.endOfRounds && <p>{`Round ${playedRounds + 1}/${totalRounds}`}</p>}
                <p>{`Your wins: ${gamesWonPlayer}. Computer wins: ${gamesWonComputer}`}</p>
                <p>{overallWinningSentence}</p>
            </div>
        </section>}

        <button onClick={handleRestartGameClick}>Restart Game</button>
    </>
}