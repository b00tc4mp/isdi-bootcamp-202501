const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App() {
    const [view, setView] = useState('intro')
    const [status, setStatus] = useState('')

    const handleStartSubmit = event => {
        event.preventDefault()

        const form = event.target
        // const word = form.querySelector('input[name=word]').vaue
        const word = form.word.value

        try {
            logic.introduceWord(word)

            const status = logic.getStatus()

            setView('game')
            setStatus(status)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        <h1>Hello, Hangman!</h1>

        {view === 'intro' && <form onSubmit={handleStartSubmit}>
            <label htmlFor="word">Guess world?</label>
            <input type="text" name="word" id="word" />
            <button type="submit">Start</button>
        </form>}

        {view === 'game' && <>
            <p style={{ fontSize: '52px' }}>{status.status}</p>

            <p>Remaining attemps: {status.remainingAttemps}</p>

            <form>
                <label htmlFor="charOrWord">Char or Word?</label>
                <input type="text" name="charOrWord" id="charOrWord" />
                <button type="submit">Try</button>
            </form>
        </>}
    </>
}

root.render(<App />)