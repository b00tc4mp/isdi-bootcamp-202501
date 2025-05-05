import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router'
import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'


export function ExtraTime({ onGiveUpClick, onFinishClick }) {
    const { alert, confirm } = useContext()

    const navigate = useNavigate()
    const [time, setTime] = useState()
    const [pauseTime, setPauseTime] = useState()
    const [status, setStatus] = useState('')
    const [intervalId, setIntervalId] = useState(null)
    const [pauseCountdown, setPauseCountdown] = useState(0)

    const [pauseIntervalId, setPauseIntervalId] = useState(null)

    const { timerId } = useParams()
    const localTimeKey = `timer-${timerId}-extraTime-on`

    useEffect(() => {
        console.debug('useEffect ExtraTime')
        try {
            const savedTime = localStorage.getItem(localTimeKey)
            const savedStatus = localStorage.getItem(`${localTimeKey}-status`)

            if (savedStatus === 'end') {
                setStatus('end')
                setTime(0)
                return
            }

            if (savedTime !== null) {
                setTime(parseInt(savedTime, 10))
            }

            logic.getTimer(timerId)
                .then(timer => {
                    if (savedTime === null) {
                        let extraTimes = timer.extraTimes
                        let extraTime = extraTimes.pop()
                        setTime(extraTime * 60)
                    }

                    setStatus(timer.status)

                    if (timer.status === 'pause') {
                        setPauseTime(timer.pauseTime)
                    }

                    if (timer.status === 'extraTime') {
                        startInterval()
                    }
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }

        return () => {
            if (intervalId) clearInterval(intervalId)
            if (pauseIntervalId) clearInterval(pauseIntervalId)
        }
    }, [timerId])


    useEffect(() => {
        if (time !== undefined) {
            localStorage.setItem(localTimeKey, time)
        }
    }, [time])

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = timeInSeconds % 60
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    const startInterval = () => {
        if (intervalId) return
        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime > 1) {
                    return prevTime - 1
                } else {
                    clearInterval(interval)
                    setStatus('end')
                    localStorage.setItem(`${localTimeKey}-status`, 'end')
                    localStorage.removeItem(localTimeKey)
                    return 0
                }
            })
        }, 1000)
        setIntervalId(interval)
    }

    const handleGiveUpClick = () => {
        confirm('Are you sure you want to give up? If you do, you will lose some of your gems.')
            .then(accepted => {
                if (accepted) {
                    try {
                        logic.exitTimer(timerId)
                            .then(() => {
                                localStorage.removeItem(localTimeKey)
                                localStorage.removeItem(`${localTimeKey}-status`)
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
                }
            })
    }

    const handlePauseClick = () => {
        try {
            clearInterval(intervalId)
            setIntervalId(null)

            if (pauseIntervalId) {
                clearInterval(pauseIntervalId)
                setPauseIntervalId(null)
            }

            logic.pauseTimer(timerId)
                .then(() => {
                    logic.getTimer(timerId)
                        .then(timer => {
                            setStatus(timer.status)
                            setPauseTime(timer.pauseTime)

                            const pauseSeconds = parseInt(timer.pauseTime, 10) * 60
                            setPauseCountdown(pauseSeconds)

                            const pauseInterval = setInterval(() => {
                                setPauseCountdown(prev => {
                                    if (prev > 1) {
                                        return prev - 1
                                    } else {
                                        clearInterval(pauseInterval)
                                        setPauseIntervalId(null)
                                        logic.resumeTimer(timerId)
                                            .then(() => {
                                                logic.getTimer(timerId)
                                                    .then(timer => {
                                                        setStatus(timer.status)
                                                        startInterval()
                                                    })
                                            })
                                            .catch(error => {
                                                console.error(error)
                                                alert(error.message)
                                            })

                                        return 0
                                    }
                                })
                            }, 1000)

                            setPauseIntervalId(pauseInterval)
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

            startInterval()

        } catch (error) {
            console.error(error)
            alert(error.message)
        }

    }

    const handleEndClick = () => {
        try {
            logic.endTimer(timerId)
                .then(() => {
                    onFinishClick()
                    localStorage.removeItem(localTimeKey)
                    localStorage.removeItem(`${localTimeKey}-status`)
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


    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    console.debug('TimerOn -> render')

    return <div className="flex flex-col items-center  mt-20">
        {status === 'extraTime' && (<h3>Painting in extra time...</h3>)}
        {status === 'pause' && (<h3>Resting</h3>)}
        {status === 'end' && <h3>Time's up! 🎉</h3>}

        <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds} min</h1>

        {status === 'pause' && (<div className="flex flex-col space-y-4 items-center justify-center w-[250px] h-[350px] bg-amber-200 m-5 p-5">
            <h1>{formatTime(pauseCountdown)}</h1>
            <p className="text-8xl p-5">⏸️</p>
            <button type="button" onClick={handleResumeClick} className="w-[150px] mt-auto mb-4">Resume</button>
        </div>)}

        <div className="sand-clock"></div>


        <div>
            <button type="button" onClick={handlePauseClick} >Pause</button>
            <button type="button" onClick={handleGiveUpClick} className="bg-red-600">Give up</button>
        </div>

        {status === 'pause' && (<div>

            <button type="button" onClick={handleGiveUpClick} className=" bg-red-600">Give up</button>
        </div>)}

        {(status === 'end') && (<div>
            <button type="button" >Add extra time</button>
            <button type="button" onClick={handleEndClick} className="bg-green-700">Finish</button>
        </div>)}



    </div>
}

//TODO show time and total time, fix create extraTimer