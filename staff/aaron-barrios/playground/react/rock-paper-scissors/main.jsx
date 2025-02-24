const root = ReactDoom.createRoot(document.getElementById('root'))

const { useState } = React

function App() {
    const [view, setView] = useState('intro')
    const [status, setStatus] = useState('')
    const [feedback, setFeedback] = useState('')
    const [gameOver, setGameOver] = useState(false)

    const handleStartSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { word: { value: word } } = form


        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        <h1>Hello RPS!!!</h1>

        {view === 'intro' && <form onSubmit={handleStartSubmit}>
            <label htmlFor="word">Rock, paper or scissors??</label>
            <input type="text" id="word" />
            <button type="submit">Start</button>
        </form>}
    </>
}

root.render(<App />)