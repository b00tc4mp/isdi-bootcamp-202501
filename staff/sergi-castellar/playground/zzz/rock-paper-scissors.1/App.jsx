const {useState, useEffect} = React

function App() {
    const [view, setView] = useState('pre-game')
    const [roundStatus, setRoundStatus] = useState({       
        computerPlay: '',
        userPlay: '',
        currentRoundWinner: '',
        gamesWonComputer: 0,
        gamesWonPlayer: 0,
        gamesDrawn: 0,
        totalRounds: 0,
        playedRounds: 0,
        roundWinningSentence: ''
    })
    const [overallStatus, setOverallStatus] = useState({
        overallWinner: '',
        overallWinningSentence: '',
        gameOver: false,
        started: false
    })



    useEffect(() => {
        if (gameStatus.totalRounds ===
            gameStatus.playedRounds) {

                const overallWinner = logic.getOverallWinner()
                
                setOverallWinner(overallWinner)
                
                setWinnerOverallSentence(logic.setWinnerOverallSentence(overallWinner))

                setGameOver(true)
            }
    }, [gameStatus.playedRounds])

    const handleSelectRoundsSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target
            const roundsNumber = Number(form['roundsNumber'].value)
            
            form.reset()

            logic.setRounds(roundsNumber)
            
            setView('during-game')

        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handleMakePlayClick = (playerPlay) => {
        try {
            if (data.playedRounds < data.totalRounds) {
                logic.generateComputerPlay()
    
                logic.setPlayerPlay(playerPlay)
    
                logic.setRoundWinner()
    
                logic.increaseWinningCount()
                
                const status = logic.getStatus()
                setGameStatus(status)

                const { currentRoundWinner } = status
                
                setWinnerRoundSentence(logic.selectWinnerRoundSentence(currentRoundWinner))
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

    const { computerPlay, userPlay, gamesWonComputer, gamesWonPlayer, gamesDrawn, totalRounds, playedRounds, currentRoundWinner } = gameStatus
    
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
            {!gameOver && <>
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
                
                
                {/* hacer dos views y los p condicionarlos a la existencia de variables */}
            </div>
            <div>
                <p>{winnerRoundSentence}</p>
                <p>{winnerOverallSentence}</p>
            </div>
        </section>}

        {view === 'post-game' && <>
            <div>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </div>
        </>}

        <button onClick={handleRestartGameClick}>Restart Game</button>
    </>
}