import { useState, useEffect } from 'react'
import { logic } from '../../logic/index.js'
export function CreateTimer({ onUserLoggedOut, onCreateTimer }) {
    const [time, setTime] = useState(60)
    const [pauseTime, setPauseTime] = useState(2)
    const [tag, setTag] = useState('')
    const [gems, setGems] = useState('')


    useEffect(() => {
        console.debug('CreateTimer -> useEffect')

        try {
            logic.getUserGems()
                .then(gems => setGems(gems))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleLogoutClick = () => {
        const accepted = confirm('Logout?')
        if (accepted) {
            logic.logoutUser()

            onUserLoggedOut()
        } else {
            console.error(error)

            alert(error.message)
        }
    }

    const handleTimeChange = (event) => {
        setTime(parseInt(event.target.value))
    }

    const handleCreateClick = () => {
        try {
            logic.createTimer(time, pauseTime, tag)
                .then(timerId => {
                    onCreateTimer(timerId)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    console.debug('CreateTimer -> render')

    return <>
        <header>
            <h2>☰</h2>
            <h1>Timer</h1>
            <div>
                <p>{gems}</p>
                <p>GEM</p>
            </div>
            <button type="button" onClick={handleLogoutClick}>Logout</button>
        </header>

        <main>
            <h3>Create a timer</h3>
            <h1>⏳ {time} min</h1>
            <input type="range" id='time' min={5} max={120} step={5} value={time} onChange={handleTimeChange} />
            <div>cuadro
            </div>
            <div>
                <h2>Pause</h2> <input type="number" id="pause" min={2} max={10} value={pauseTime} onChange={e => setPauseTime(Number(e.target.value))} /> <p>min</p>
                <p>You have 8 pauses</p>

                <h2>Tag</h2> <input type="text" id='tag' value={tag}
                    onChange={e => setTag(e.target.value)} />
            </div>
            <button type='button' onClick={handleCreateClick}>Create</button>
        </main>
    </>

}
