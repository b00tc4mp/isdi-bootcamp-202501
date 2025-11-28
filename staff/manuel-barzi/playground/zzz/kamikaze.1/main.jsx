const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState, useEffect } = React

function App() {
    const [status, setStatus] = useState(null)

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
                else if (key === 'ArrowDown')
                    logic.goDown()
                else if (key === 'ArrowUp')
                    logic.goUp()

                const status = logic.getStatus()

                setStatus(status)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })
    }, [])

    return <>
        {status && <>
            <Warship x={status.player.x} y={status.player.y} />

            {status.obstacles.map(({ x, y }) => <Kamikaze x={x} y={y} />)}

            {status.lost && <h1>YOU LOSE!</h1>}
        </>}
    </>
}

root.render(<App />)