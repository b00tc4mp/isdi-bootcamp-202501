const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App() {
    const [view, setView] = useState('intro')
    const [status, setStatus] = useState('')

    const handleStartClick = () => {
        try {
            logic.cpuElection()

            setView('game')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    const handleScissorsClick = () => {
        try {
            let move = "s"

            logic.checkPlayerMove(move)

            logic.playerMove(move)

            const status = logic.gameStatus()
            setStatus(status)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRockClick = () => {
        try {
            let move = "r"

            logic.checkPlayerMove(move)

            logic.playerMove(move)

            const status = logic.gameStatus()
            setStatus(status)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePaperClick = () => {
        try {
            let move = "p"

            logic.checkPlayerMove(move)

            logic.playerMove(move)

            const status = logic.gameStatus()
            setStatus(status)
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
        {view === 'intro' && <h1>Hello RPS!!!</h1>}

        {view === 'intro' && < button onClick={handleStartClick}>Start</button >}

        {view === 'game' && <h2>ITS TIME TO ROOOOCK!!</h2>}

        {
            view === 'game' && <form>
                <label htmlFor="move">Rock, paper or scissors??</label>
                <br />
                <button type="button" on Click={handleRockClick}>Rock 🪨</button>
                <button type="button" onClick={handlePaperClick}>Paper 🧻</button>
                <button type="button" onClick={handleScissorsClick}>Scissors ✂️</button>
            </form>
        }


        {
            status && <>
                <p>{`CPU Wins: ${status.cpuWins},
            Player Wins: ${status.playerWins},
            Player won: ${status.playerWon},
            CPU won:  ${status.cpuWon},
            Game over: ${status.gameOver}
            `}</p>

                {status.playerWon && <h2>You WIN!</h2>}

                {status.cpuWon && <h2>You LOSE!</h2>}

                {status.gameOver && <button onClick={handleRestartClick}>Restart</button>}
            </>
        }
    </>
}

root.render(<App />)