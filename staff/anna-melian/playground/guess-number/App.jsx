const { useState, useEffect } = React


function App() {
    const [state, setState] = useState('playing')
    const [userNumber, setUserNumber] = useState()
    const [gameInfo, setGameInfo] = useState([])
    const [attemptedNumbers, setAttemptedNumbers] = useState([])
    const [playAgain, setPlayAgain] = useState(false)


    useEffect(() => {
        console.debug('App -->Start')
        console.log(data.randomNumber)
        const info = logic.showState()
        setGameInfo(info)
        setUserNumber()
    }, [playAgain])

    useEffect(() => {
        console.debug('GameInfo updated\n-----------')
        if (!gameInfo[1] && !gameInfo[2]) {

        } else if (gameInfo[1]) {
            setState('win')
        } else if (gameInfo[2]) {
            setState('lost')
        }
    }, [gameInfo[1], gameInfo[2]])

    useEffect(() => {
        console.debug('Number try')
        if (userNumber != undefined) {
            logic.tryNumber(userNumber)
            const info = logic.showState()
            setGameInfo(info)
            setAttemptedNumbers(prev => [...prev, userNumber])
        }
    }, [userNumber])

    const handleSubmit = event => {
        event.preventDefault()
        try {
            const { target: form } = event
            const {
                number: { value: number },
            } = form
            const valid = logic.validation(number)
            if (valid != 'invalid') {
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

    const OnPlayAgainClick = () => {
        setState('playing')
        logic.reset()
        playAgain ? setPlayAgain(false) : setPlayAgain(true)
        setAttemptedNumbers([])

    }

    return <>


        {state === 'playing' && <div>
            <h1>Hello,guess number</h1>
            <form onSubmit={handleSubmit} >
                <p htmlFor="text">Write a number between 0 to 100</p>
                <input id='number' type="number" />
                <button type="click">Try</button>
            </form>
            <p>You have {gameInfo[0]} attempts left
            </p>
            <p> You already try : {attemptedNumbers.join(', ')} </p>
        </div>}

        {state === 'win' && <div>
            <h1>Congratulatons! You win</h1>
            <p>The secret number was {userNumber}</p>
            <button type="click" onClick={OnPlayAgainClick}>Play again</button>

        </div>}
        {state === 'lost' && <div>
            <h1>Game over, you lose</h1>
            <button type="click" onClick={OnPlayAgainClick}>Play again</button>
        </div>

        }






    </>
}