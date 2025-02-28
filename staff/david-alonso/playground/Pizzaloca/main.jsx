const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState, useEffect } = React

function App() {
    const [status, setStatus] = useState(null)
    const [view, setView] = useState('start')

    const handleStartClick = () => setView('game')

    useEffect(() => {
        try {
            const status = logic.getStatus()

            setStatus(status)
        } catch (error) {
            console.error(error)

            alert(error)
        }

        document.addEventListener('keydown', event => {
            try {
                const { key } = event

                if (key === 'ArrowRight')
                    logic.goRight()
                else if (key === 'ArrowLeft')
                    logic.goLeft()
                // else if (key === 'ArrowDown')
                //     logic.goDown()
                // else if (key === 'ArrowUp')
                //     logic.goUp()

                const status = logic.getStatus()

                setStatus(status)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })

        setInterval(() => {
            try {
                logic.updatePizzas()

                const status = logic.getStatus()

                setStatus(status)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }, 500)
    }, [])

    return (
        <>
            {view === 'start' && <Start onStartClick={handleStartClick} />}

            {view === 'game' && status && (
                <>
                    <Boy x={status.boy.x} y={status.boy.y} />

                    {status.pizzas.map(({ x, y }, index) => (
                        <Pizza key={index} x={x} y={y} />
                    ))}

                    <div className="screen">
                        {status.lost && <h1 className="lose-message">YOU LOSE!</h1>}
                    </div>
                </>
            )}
        </>
    );

}

root.render(<App />)