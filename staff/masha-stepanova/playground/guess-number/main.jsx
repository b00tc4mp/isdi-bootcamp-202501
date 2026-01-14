const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App() {
    const [view, setView] = useState('start-game')
    const [state, setState] = useState('')

    // const isLost = logic.helper.isLost()
    const isWon = logic.helper.isWon()

    logic.initializeNumberToGuess()

    const handleTryNumberSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target
            const guessedNumber = Number(form.number.value)

            console.log(guessedNumber)

            logic.tryNumber(guessedNumber)

            form.reset()
            const { attempts, temperature, attemptedNumbers, won, lost, gameOver } = logic.getStatus()

            setState(`Temperature: ${temperature}, attempts: ${attempts}, attempted numbers: ${attemptedNumbers}`)

            if (logic.helper.isGameOver())
                setView('game-over')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }


    }

    const handleStartGameClick = () => {
        setView('in-game')
    }

    const handleRestartGameClick = () => {
        try {
            logic.reset()

            setView('in-game')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }



    return <>
        <h1>Guess the number 🕵️</h1>

        {view === 'start-game' && <section>
            <p>Your computer will set a number that you have to guess in 10 tries. Let's play!</p>

            <button type="button" onClick={() => handleStartGameClick()}>Start game!</button>
        </section>}

        {view === 'in-game' && <section>
            <p>Introduce a number between 0 and 100</p>

            <form onSubmit={handleTryNumberSubmit}>
                <label htmlFor="number">What number are you thinking about?</label>
                <input type="number" id="number" />

                <button type="submit">Try!</button>

                <p>{state}</p>
            </form>
        </section>}

        {view === 'game-over' && <section>
            <p>{isWon ? 'Congratulations! 😍' : 'Oh no, this time you lose 😔'}</p>

            <button type="button" onClick={() => handleRestartGameClick()}>Restart game</button>
        </section>}
    </>



}

root.render(<App />)

// const interface = {
//     start() {
//         try {
//             logic.initializeNumberToGuess()
//         } catch (error) {
//             console.error(error)

//             alert(error.message)
//         }
//     },

//     askNumber() {
//         try {
//             const number = Number(prompt('Number?'))

//             logic.tryNumber(number)
//         } catch (error) {
//             console.error(error)

//             alert(error.message)
//         }
//     },

//     viewStatus() {
//         try {
//             const { attempts, temperature, attemptedNumbers, won, lost, gameOver } = logic.getStatus()

//             arguments(`temperature ${temperature}, attempts ${attempts}, attempted numbers ${attemptedNumbers}, won ${won}, lost ${lost}, gameOver ${gameOver}`)
//         } catch (error) {
//             console.error(error)

//             alert(error.message)
//         }
//     },

//     restart() {
//         try {
//             logic.reset()
//         } catch (error) {
//             console.error(error)

//             alert(error.message)
//         }
//     }
// }