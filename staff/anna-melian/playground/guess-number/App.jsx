const { useState, useEffect } = React


function App() {
    const [state, setState] = useState('')
    const [userNumber, setUserNumber] = useState()
    const [gameInfo, setGameInfo] = useState([])

    useEffect(() => {
        console.debug('App -->Playing')
        console.log(data.randomNumber)
        const start = 'playing'
        setState(start)
        const info = logic.showState()
        setGameInfo(info)
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        try {
            const { target: form } = event
            const {
                number: { value: number },
            } = form
            const valid = logic.validation(number)
            if (valid != 'empty or negative') {
                const userTry = Number(number)
                setUserNumber(userTry)

            } else {
                alert('Invalid number')
            }

            form.reset()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }
    if (userNumber != undefined) {
        logic.tryNumber(userNumber)
        const info = logic.showState()
        setGameInfo(info)
        setUserNumber()
    }


    if (!gameInfo[1] && !gameInfo[2]) {
        //numbersTried.push(userNumber)

    } else if (gameInfo[1]) {
        setState('win')
    } else if (gameInfo[2]) {
        setState('lost')
    }

    return <>
        <h1>Hello,guess number</h1>

        {state === 'playing' && <div>
            <form onSubmit={handleSubmit} >
                <p htmlFor="text">Write a number</p>
                <input id='number' type="number" />
                <button type="click">Try</button>
            </form>
            <p>You have {gameInfo[0]} attempts left
            </p>
            <p>You already try : </p>
        </div>}

        {state === 'win' && <h1>Win</h1>}
        {state === 'lost' && <h1>Win</h1>}






    </>
}