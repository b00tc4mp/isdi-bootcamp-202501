const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState, useEffect } = React

const randomNumber = logic.randomNumber()

function App() {
    const [view, setView] = useState('game')

    const handleGuessNumberSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const number = Number(form.number.value)

            logic.validateInput(number)

            logic.sentNumber(randomNumber, number)

            form.reset()

            gameChecker()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const gameChecker = function () {
        try {
            if (data.constants.END_GAME === 'win')
                setView('win')
            else if (data.constants.END_GAME === 'lose')
                setView('lose')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRestartClick = () => {
        try {
            logic.restart()

            setView('game')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        {view === 'game' && <main>
            <h1>Hello, Guess Number!</h1>

            <form onSubmit={handleGuessNumberSubmit}>
                <label htmlFor="number">Guess Number</label>
                <br />
                <input type="text" id="number" />

                <br />
                <button type="submit">Try</button>
            </form>

            <br />
            <p>Need some help?</p>
        </main>}


        {view === 'game' && <section>
            <p>
                Here's a little bit of info about the correct number and your guess.
            </p>
            <p>
                {`- It freezes ( >40)`}
            </p>
            <p>
                {` - So cooold ( > 30 <= 40)`}
            </p>
            <p>
                {`- Meh ( > 20 <= 30)`}
            </p>
            <p>
                {`- Hot, hot ( > 10 <= 20)`}
            </p>
            <p>
                {`- So hot ( > 5 <= 10)`}
            </p>
            <p>
                {`- It burns ( <= 5)`}
            </p>
        </section>}

        {view === 'win' && <section>
            <h1>You won, congratulations!!</h1>

            <button onClick={handleRestartClick}>Restart</button>
        </section>}

        {view === 'lose' && <section>
            <h1>You have lost... You do not have any attempts left...</h1>

            <button onClick={handleRestartClick}>Restart</button>
        </section>}
    </>
}
root.render(<App />)