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

            alert(error.message)
        }


        document.addEventListener('keydown', event => {
            try {
                const { key } = event

                if (key === 'ArrowUp')
                    logic.goUp()
                else if (key === 'ArrowDown')
                    logic.goDown()

                const status = logic.getStatus()
                setStatus(status)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })

        const intervalId = setInterval(() => {
            try {
                logic.updateZombies()

                const status = logic.getStatus()
                setStatus(status)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }, 500)

        return () => clearInterval(intervalId)
    }, [])

    return <>
        {status && <>
            <Plant />
        </>}
    </>
}

root.render(<App />)
