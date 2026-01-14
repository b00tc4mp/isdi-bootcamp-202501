const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App() {
    const [view, setView] = useState('inGame')
    const [gameFinished, setGameFinished] = useState(false)

    logic.createNumber()

    const handleTryNumberSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target
            const number = Number(form[0].value)

            console.log(number)

            const isWon = logic.isWon(number)
            const isTurnsLeft = !!logic.userIsAlive()

            if (!logic.gameOver(number)) {
                logic.guessNumber(isTurnsLeft, isWon, number)

                form.reset()
                logic.hint()
            } else {
                setView(logic.gameOver(number) ? 'gameFinished' : "inGame")
            }


        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        <h1>Welcome to guess the number game!</h1>

        {view === "inGame" && <section>
            <p>Your computer will set a number that you have to guess in 10 tries. Let's play!</p>

            <form onSubmit={handleTryNumberSubmit}>
                <label htmlFor="number">What number are you thinking about?</label>
                <input type="number" id="number" />

                <button type="submit">Try!</button>
            </form>
        </section>}
        {view === "gameFinished" && <section>

        </section>}
    </>
}

root.render(<App />)