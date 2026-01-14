const { useState, useEffect } = React

function App() {
    const [status, setStatus] = useState(null)

    // upload the page with current status of the game immediatly
    useEffect(() => {
        try {
            const status = logic.getStatus()

            setStatus(status)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

        // add movement to player's object
        document.addEventListener('keydown', event => {
            console.log('hi')
            try {
                const { key } = event

                if (key === 'ArrowRight')
                    logic.goRight()
                else if (key === 'ArrowLeft')
                    logic.goLeft()

                const status = logic.getStatus()

                setStatus(status)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })

        // set starting interval of falling objects
        setInterval(() => {
            try {
                logic.updateFallingObjects()

                const status = logic.getStatus()

                setStatus(status)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }, 500)
    }, [])

    return <>
        {status && <>
            <Player x={status.player.x} y={status.player.y} />

            {status.fallingObjects.map(({ x, y }) => <Codes x={x} y={y} />)}

            {status.lost && <h1>YOU LOSE!</h1>}
        </>}
    </>
}