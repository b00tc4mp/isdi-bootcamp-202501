import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router'
import { logic } from '../../logic/index.js'


export function TimerOn({ onReturnClick, onGiveUpClick }) {
    const navigate = useNavigate()
    const [time, setTime] = useState()
    const [pauseTime, setPauseTime] = useState()
    const [status, setStatus] = useState('')

    const { timerId } = useParams()

    useEffect(() => {
        console.debug('useEffect TimerOn')
        try {
            logic.getTimer(timerId)
                .then(timer => {
                    if (timer.status === 'created') {
                        setTime(timer.time)
                    }
                    setStatus(timer.status)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [timerId])

    const handleReturnClick = () => {
        const accepted = confirm('Are you sure to return?')
        if (accepted) {
            try {
                logic.deleteTimer(timerId)
                    .then(() => {
                        onReturnClick()
                    })
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })

            } catch (error) {
                console.error(error)
                alert(error.message)
            }
        } else {
            console.error(error)

            alert(error.message)
        }
    }

    const handleStartClick = () => {
        try {
            logic.startTimer(timerId)
                .then(() => {
                    logic.getTimer(timerId)
                        .then(timer => {
                            setStatus(timer.status)
                        })
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

    const handleGiveUpClick = () => {
        const accepted = confirm('Are you sure you want to give up? If you do, you will lose some of your gems.')
        if (accepted) {
            try {
                logic.exitTimer(timerId)
                    .then(() => {
                        onGiveUpClick()
                    })
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })

            } catch (error) {
                console.error(error)
                alert(error.message)
            }
        } else {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePauseClick = () => {
        try {
            logic.pauseTimer(timerId)
                .then(() => {
                    logic.getTimer(timerId)
                        .then(timer => {
                            setStatus(timer.status)
                            setPauseTime(timer.pauseTime)
                        })
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

    const handleResumeClick = () => {
        try {
            logic.resumeTimer(timerId)
                .then(() => {
                    logic.getTimer(timerId)
                        .then(timer => {
                            setStatus(timer.status)
                        })
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

    console.debug('TimerOn -> render')

    return <>
        {status === 'created' && (<h3>Ready to start!</h3>)}
        {status === 'active' && (<h3>Painting...</h3>)}
        {status === 'pause' && (<h3>Resting</h3>)}
        <h1>{time}</h1>
        {status === 'created' && (<div>
            <button type="button" onClick={handleStartClick}>Start</button>
            <button type="button" onClick={handleReturnClick}>Return</button>
        </div>)}
        {(status === 'active' || status === 'extraTime') && (<div>
            <button type="button" onClick={handlePauseClick} >Pause</button>
            <button type="button" onClick={handleGiveUpClick}>Give up</button>
        </div>)}

        {status === 'pause' && (<div>
            <h1>{pauseTime}</h1>
            <button type="button" onClick={handleResumeClick}>Resume</button>
            <button type="button" onClick={handleGiveUpClick}>Give up</button>
        </div>)}



    </>
}

