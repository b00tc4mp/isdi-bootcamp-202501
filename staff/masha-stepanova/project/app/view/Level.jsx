import { useState, useEffect } from 'react'
import { useContext } from '../context'
import { EndLevelScreen } from './endLevelScreen'

import { logic } from '../logic'

export function Level({ level }) {
    const { alert, confirm } = useContext()

    const [view, setView] = useState('')
    const [type, setType] = useState('')
    const [showEndLevel, setShowEndLevel] = useState('false')
    const [levelIsPassed, setLevelIsPassed] = useState(false)

    useEffect(() => {
        try {
            setView('closed')

            const type = level.type

            setType(type)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleLevelClick = () => setView('opened')

    const handlePlayClick = () => setView('inGame')

    const handleCancelClick = () => setView('closed')

    const handleResponseClick = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const selector = form.querySelector('input[name="userAnswer"]:checked')

            const userAnswer = selector.value

            logic.isLevelPassed(level.id, userAnswer)
                .then(isPassed => {
                    form.reset()

                    setLevelIsPassed(levelIsPassed)

                    setShowEndLevel(true)
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }




    }

    return <>

        <div>
            {view === 'closed' && <button onClick={handleLevelClick}>{level.name}</button>}
            {view === 'opened' && <section>
                <h2>{level.name}</h2>
                <p>{level.description}</p>

                {level.isBlocked ? <button>Play 🔒</button> : <button onClick={handlePlayClick}>Play</button>}

                <a onClick={handleCancelClick}>Cancel</a>

            </section>}
            {view === 'inGame' && <section>
                <h1>{level.name}</h1>

                <p>{level.description}</p>

                <p>{level.body}</p>

                <form onSubmit={handleResponseClick}>
                    {type === "quiz" && <>
                        {level.resultOptions.map((option, i) => <><input type="radio" id={option} name="userAnswer" value={option} /> <label for="userAnswer">{option}</label> </>)}
                    </>}

                    <button>Submit</button>
                </form>

            </section>}

            {showEndLevel === true && <EndLevelScreen level={level} isPassed={levelIsPassed} />}
        </div>
    </>
}