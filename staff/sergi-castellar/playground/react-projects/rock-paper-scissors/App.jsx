const {useState, useEffect} = React

function App() {
    const [view, setView] = useState('pre-game')
    const [status, setStatus] = useState({       
        computerPlay: '',
        userPlay: '',
        currentRoundWinner: '',
        roundWinningSentence: '',
        gamesWonComputer: 0,
        gamesWonPlayer: 0,
        gamesDrawn: 0,
        endOfRounds: false,
        started: false,
        totalRounds: 0,
        playedRounds: 0
    })
    const [overallStatus, setOverallStatus] = useState({
        overallWinner: '',
        overallWinningSentence: '',
    })

    useEffect(() => {
        if (status.started && status.endOfRounds) {
                const overallWinner = logic.getOverallWinner()
                const overallWinningSentence = logic.setWinnerOverallSentence(overallWinner)
                
                setOverallStatus({overallWinner: overallWinner, overallWinningSentence: overallWinningSentence})
            }
    }, [status])

    const handleSelectRoundsSubmit = event => {
        event.preventDefault()
        
        try {
            const { target: form } = event
            let { roundsNumber: { value: roundsNumber } } = form
            roundsNumber = Number(roundsNumber)
            console.log(event.target.roundsnumber, roundsNumber)
            
            form.reset()
            
            logic.setRounds(roundsNumber)
            setStatus({...status, started: true, totalRounds: roundsNumber})
            
            setView('during-game')
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handleMakePlayClick = (playerPlay) => {
        try {
            if (status.started && !status.endOfRounds) {
                const computerPlay = logic.generateComputerPlay()
    
                logic.setPlayerPlay(playerPlay)

                const roundWinner = logic.setRoundWinner()
                
                const roundWinningSentence = logic.selectWinnerRoundSentence(roundWinner)
                
                const { gamesWonComputer: gamesWonComputer, gamesWonPlayer: gamesWonPlayer, gamesDrawn: gamesDrawn, playedRounds: playedRounds } = logic.increaseWinningCount()
                
                setStatus({
                    ...status,
                    computerPlay: computerPlay,
                    userPlay: playerPlay,
                    currentRoundWinner: roundWinner,
                    roundWinningSentence: roundWinningSentence,
                    gamesWonComputer: gamesWonComputer,
                    gamesWonPlayer: gamesWonPlayer,
                    gamesDrawn: gamesDrawn,
                    playedRounds: playedRounds,
                    totalRounds: totalRounds
                })

                if (totalRounds === playedRounds)
                    setStatus({...status, endOfRounds: true})
            }
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handleRestartGameClick = () => {
        data.computerPlay = ''
        data.userPlay = ''
        data.currentRoundWinner = ''
        data.overallWinner = ''
        data.gameOver = false
        data.gamesWonComputer = 0
        data.gamesWonPlayer = 0
        data.gamesDrawn = 0
        data.totalRounds = 0
        data.playedRounds = 0

        setStatus({
            computerPlay: '',
            userPlay: '',
            currentRoundWinner: '',
            roundWinningSentence: '',
            gamesWonComputer: 0,
            gamesWonPlayer: 0,
            gamesDrawn: 0,
            endOfRounds: false,
            started: false,
            totalRounds: 0,
            playedRounds: 0
        })
        setOverallStatus({
            overallWinner: '',
            overallWinningSentence: ''
        })
        setView('pre-game')
    }

    const { computerPlay, userPlay, currentRoundWinner, roundWinningSentence, gamesWonComputer, gamesWonPlayer, gamesDrawn, totalRounds, playedRounds } = status
    const { overallWinner, overallWinningSentence } = overallStatus
    
    const playerPlayImg = userPlay ? `./assets/${userPlay}.png` : ''
    const computerPlayImg = computerPlay ? `./assets/${computerPlay}.png` : ''
    const currentRoundWinnerImg = currentRoundWinner ? `./assets/${currentRoundWinner}.png` : ''

    return <>
        <h1>Rock-paper-scissors</h1>
        <h3>Challenge the machine in a classic game of Rock, Paper, Scissors! Choose your move—rock, paper, or scissors—and see if you can outsmart the computer. Will you crush the scissors, cover the rock, or cut the paper? Play against the AI, and try to win as many rounds as possible. The game is fast-paced, fun, and perfect for a quick break. Are you ready to prove you're the ultimate Rock, Paper, Scissors champion?</h3>
        
        {view === 'pre-game' && <form id='rounds-form' onSubmit={handleSelectRoundsSubmit}>
            <label htmlFor='roundsNumber'>Number of rounds: </label>
            <input type='number' min='1' id='roundsNumber' placeholder="Enter a number" />
            <button type="submit" form='rounds-form'>Select</button>
        </form>}

        {view === 'during-game' && <section>
            {!status.endOfRounds && status.started && <>
            <h3>Select your play</h3>
            <div id='game-buttons'>
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
                <img width="100px" src={playerPlayImg} />
                <img width="70px" src={currentRoundWinnerImg} />
                <img width="100px" src={computerPlayImg} /> 
            </div>
            <div>
                <p>{roundWinningSentence}</p>
                {!status.endOfRounds && <p>{`Round ${playedRounds + 1}/${totalRounds}`}</p>}
                <p>{`Your wins: ${gamesWonPlayer}. Computer wins: ${gamesWonComputer}`}</p>
                <p>{overallWinningSentence}</p>
            </div>
        </section>}

        <button onClick={handleRestartGameClick}>Restart Game</button>
    </>
}