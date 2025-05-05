import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router'
import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'



export function TimerOn({ onReturnAccepted, onGiveUpClick, onFinishClick, onAddExtraTime }) {
    const { alert, confirm } = useContext()

    const navigate = useNavigate()
    const [time, setTime] = useState()
    const [extraTime, setExtraTime] = useState(5)
    const [initialTime, setInitialTime] = useState()
    const [pauseTime, setPauseTime] = useState()
    const [status, setStatus] = useState('')
    const [intervalId, setIntervalId] = useState(null)
    const [pauseCountdown, setPauseCountdown] = useState(0)

    const [pauseIntervalId, setPauseIntervalId] = useState(null)

    const { timerId } = useParams()
    const localTimeKey = `timer-${timerId}-time`

    useEffect(() => {
        console.debug('useEffect TimerOn')
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
                        setTime(timer.time * 60)
                        setInitialTime(timer.time)
                    }

                    setStatus(timer.status)

                    if (timer.status === 'pause') {
                        setPauseTime(timer.pauseTime)
                    }

                    if (timer.status === 'active') {
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

    const handleReturnClick = () => {
        confirm('Are you sure to return?')
            .then(accepted => {
                if (accepted) {
                    try {
                        logic.deleteTimer(timerId)
                            .then(() => {
                                localStorage.removeItem(localTimeKey)
                                localStorage.removeItem(`${localTimeKey}-status`)
                                onReturnAccepted()
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

            startInterval()

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
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

    const handleExtraTimeClick = () => {
        setStatus('setExtraTime')
    }

    const handleExtraTimeStartClick = () => {
        try {
            logic.addExtraTime(timerId, extraTime)
                .then(() => {
                    onAddExtraTime(timerId)
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
        {status === 'created' && (<h3>Ready to start!</h3>)}
        {status === 'active' && (<h3>Painting...</h3>)}
        {status === 'pause' && (<h3>Resting</h3>)}
        {status === 'end' && <h3>Time's up! 🎉</h3>}

        {status !== 'setExtraTime' && <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds} min</h1>}

        {status === 'pause' && (<div className="flex flex-col space-y-4 items-center justify-center w-[250px] h-[350px] bg-amber-200 m-5 p-5">
            <h1>{formatTime(pauseCountdown)}</h1>
            <p className="text-8xl p-5">⏸️</p>
            <button type="button" onClick={handleResumeClick} className="w-[150px] mt-auto mb-4">Resume</button>
        </div>)}

        {status === 'active' && (<div className="sand-clock"></div>)}

        {status === 'setExtraTime' && (
            <div className="flex flex-col items-center justify-center w-[400px] h-[550px] bg-yellow-50 rounded-2xl shadow-xl p-6 space-y-8 text-center border-4 border-fuchsia-900">

                <h2 className="text-3xl font-bold text-fuchsia-900">➕ Add Extra Time</h2>

                <label htmlFor="timeExtra" className="text-xl font-semibold text-yellow-600">
                    Select extra minutes:
                </label>

                <input
                    type="number"
                    id="timeExtra"
                    min={5}
                    max={240 - initialTime}
                    step={5}
                    value={extraTime}
                    onChange={e => setExtraTime(Number(e.target.value))}
                    className="w-[180px] text-2xl px-4 py-2 border-2 border-red-900 rounded-lg text-center text-fuchsia-900 font-bold"
                />

                <div className="text-xl text-gray-800 space-y-2">
                    <p><strong className="text-fuchsia-900">Initial Time:</strong> {initialTime} min</p>
                    <p><strong className="text-red-900">Total Time:</strong> {initialTime + extraTime} min</p>
                    <p className="text-base text-red-600 italic">(Limit: 240 min)</p>
                </div>

                <button
                    type="button"
                    onClick={handleExtraTimeStartClick}
                    className="w-full h-[48px] bg-green-600 text-white text-lg font-semibold rounded-xl shadow hover:bg-green-700 transition-all flex items-center justify-center"
                >
                    Start Extra Time
                </button>

            </div>
        )}

        {status === 'created' && (<div>
            <button type="button" onClick={handleStartClick}>Start</button>
            <button type="button" onClick={handleReturnClick} className="bg-red-900">Return</button>
        </div>)}

        {(status === 'active' || status === 'extraTime') && (<div>
            <button type="button" onClick={handlePauseClick} >Pause</button>
            <button type="button" onClick={handleGiveUpClick} className="bg-red-600">Give up</button>
        </div>)}

        {status === 'pause' && (<div>

            <button type="button" onClick={handleGiveUpClick} className=" bg-red-600">Give up</button>
        </div>)}

        {(status === 'end') && (<div>
            <button type="button" onClick={handleExtraTimeClick}>Add extra time</button>
            <button type="button" onClick={handleEndClick} className="bg-green-700">Finish</button>
        </div>)}



    </div>
}

