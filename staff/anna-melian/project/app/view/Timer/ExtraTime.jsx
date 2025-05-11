import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router'
import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'


export function ExtraTime({ onGiveUpClick, onFinishClick }) {
    const { alert, confirm } = useContext()

    const navigate = useNavigate()
    const [time, setTime] = useState()
    const [extraTime, setExtraTime] = useState(5)
    const [initialTime, setInitialTime] = useState()
    const [totalTime, setTotalTime] = useState()
    const [status, setStatus] = useState('')
    const [intervalId, setIntervalId] = useState(null)
    const [pauseCountdown, setPauseCountdown] = useState()

    const [pauseIntervalId, setPauseIntervalId] = useState(null)

    const { timerId } = useParams()
    const localExtraTimeKey = `timer-${timerId}-extraTime-on`
    const localPauseTimeKey = `timer-${timerId}-pauseTime`



    useEffect(() => {
        console.debug('useEffect ExtraTime')
        try {
            const savedTime = localStorage.getItem(localExtraTimeKey)
            const savedStatus = localStorage.getItem(`${localExtraTimeKey}-status`)

            if (savedStatus === 'end') {
                setStatus('end')
                setTime(0)



                return
            } else if (savedStatus === 'pause') {
                setStatus('pause')
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
                    setInitialTime(timer.time)
                    const totalExtraTime = timer.extraTimes
                    setTotalTime(totalExtraTime.reduce((acc, curr) => acc + curr, initialTime))


                    const savedPauseCountdown = localStorage.getItem(localPauseTimeKey)
                    if (savedPauseCountdown) {
                        setPauseCountdown(parseInt(savedPauseCountdown, 10))
                    } else {
                        setPauseCountdown(parseInt(timer.pauseTime, 10) * 60)
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
        if (status === 'pause' && pauseCountdown > 0 && !pauseIntervalId) {
            startPauseCountdown()
        }
    }, [status, pauseCountdown])


    useEffect(() => {
        if (time !== undefined) {
            localStorage.setItem(localExtraTimeKey, time)
        }
    }, [time])

    useEffect(() => {
        if (pauseCountdown !== undefined) {
            localStorage.setItem(localPauseTimeKey, pauseCountdown)
        }

    }, [pauseCountdown])

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
                    localStorage.setItem(`${localExtraTimeKey}-status`, 'end')
                    localStorage.removeItem(localExtraTimeKey)
                    return 0
                }
            })
        }, 1000)
        setIntervalId(interval)
    }

    const startPauseCountdown = () => {
        if (pauseIntervalId) return

        const interval = setInterval(() => {
            setPauseCountdown(prev => {
                if (prev > 1) {
                    return prev - 1
                } else {
                    clearInterval(interval)
                    setPauseIntervalId(null)
                    localStorage.removeItem(localPauseTimeKey)

                    logic.resumeTimer(timerId)
                        .then(() => {
                            setStatus('extraTime')
                            startInterval()
                        })
                        .catch(error => {
                            console.error(error)
                            alert(error.message)
                        })

                    return 0
                }
            })
        }, 1000)

        setPauseIntervalId(interval)
    }

    const getGemsNumber = () => {
        return logic.getTimer(timerId)
            .then(timer => {
                const initialSetTime = timer.time
                const totalExtraTime = timer.extraTimes
                return totalExtraTime.reduce((acc, curr) => acc + curr, initialSetTime)
            })
            .catch(error => {
                console.error(error)
                alert(error.message)
                return 0
            })
    }


    const handleGiveUpClick = () => {
        getGemsNumber()
            .then(loseGems => {
                confirm(`Are you sure you want to give up? If you do, you will lose ${loseGems} gems.`)
                    .then(accepted => {
                        if (accepted) {
                            logic.exitTimer(timerId)
                                .then(() => {
                                    localStorage.removeItem(localExtraTimeKey)
                                    localStorage.removeItem(`${localExtraTimeKey}-status`)
                                    onGiveUpClick()
                                })
                                .catch(error => {
                                    console.error(error)
                                    alert(error.message)
                                })
                        }
                    })
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


                            const pauseSeconds = parseInt(timer.pauseTime, 10) * 60
                            setPauseCountdown(pauseSeconds)
                            localStorage.setItem(localPauseTimeKey, pauseSeconds)

                            startPauseCountdown()
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
            if (pauseIntervalId) {
                clearInterval(pauseIntervalId)
                setPauseIntervalId(null)
            }

            localStorage.removeItem(localPauseTimeKey)

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
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleEndClick = () => {
        getGemsNumber()
            .then(winGems => {
                confirm(`You'll get ${winGems} gems by ending now. Ready to finish?`)
                    .then(accepted => {
                        if (accepted) {
                            logic.endTimer(timerId)
                                .then(() => {
                                    localStorage.removeItem(localExtraTimeKey)
                                    localStorage.removeItem(`${localExtraTimeKey}-status`)
                                    onFinishClick()
                                })
                                .catch(error => {
                                    console.error(error)
                                    alert(error.message)
                                })
                        }
                    })
            })
            .catch(error => {
                console.error(error)
                alert(error.message)
            })

    }

    const handleExtraTimeClick = () => {
        logic.getTimer(timerId)
            .then(timer => {
                const totalExtraTime = timer.extraTimes
                const initialSetTime = timer.time
                setTotalTime(totalExtraTime.reduce((acc, curr) => acc + curr, initialSetTime))

                if (intervalId) clearInterval(intervalId)
                setIntervalId(null)

                setStatus('setExtraTime')

            })
            .catch(error => {
                console.error(error)
                alert(error.message)
            })
    }

    const handleExtraTimeStartClick = () => {
        try {
            logic.addExtraTime(timerId, extraTime)
                .then(() => {
                    localStorage.setItem(localExtraTimeKey, extraTime * 60)
                    localStorage.setItem(`${localExtraTimeKey}-status`, 'extraTime')
                    setStatus('extraTime')

                    setTime(extraTime * 60)
                    startInterval()

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

    console.debug('ExtraTime -> render')

    return <div className="flex flex-col items-center  mt-20">
        {status === 'extraTime' && (
            <h3 className="text-2xl font-bold text-fuchsia-900 animate-pulse">Working in extra time...</h3>
        )}
        {status === 'pause' && (<h3>Resting</h3>)}
        {status === 'end' && <h3>Time's up! 🎉</h3>}

        {status !== 'setExtraTime' && <h1 className="text-5xl font-mono font-bold text-gray-800">{minutes}:{seconds < 10 ? `0${seconds}` : seconds} min</h1>}

        {status === 'pause' && (
            <div className="flex flex-col space-y-6 items-center justify-center w-[280px] h-[380px] bg-amber-200 rounded-xl shadow-lg p-6 border-2 border-yellow-600">
                <h1 className="text-4xl font-bold text-fuchsia-900">{formatTime(pauseCountdown)}</h1>
                <p className="text-8xl p-2">⏸️</p>
                <button
                    type="button"
                    onClick={handleResumeClick}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold"
                >
                    Resume
                </button>
            </div>
        )}

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
                    max={240 - totalTime}
                    step={5}
                    value={extraTime}
                    onChange={e => setExtraTime(Number(e.target.value))}
                    className="w-[180px] text-2xl px-4 py-2 border-2 border-red-900 rounded-lg text-center text-fuchsia-900 font-bold"
                />
                <div className="text-xl text-gray-800 space-y-2">
                    <p><strong className="text-fuchsia-900">Run Time:</strong> {totalTime} min</p>
                    <p><strong className="text-red-900">Total Time:</strong> {totalTime + extraTime} min</p>
                    <p className="text-base text-red-600 italic">(Limit: 240 min)</p>
                </div>
                <button
                    type="button"
                    onClick={handleExtraTimeStartClick}
                    className="w-full h-[48px] bg-fuchsia-900 text-white text-lg font-semibold rounded-xl shadow hover:bg-fuchsia-700 transition-all flex items-center justify-center"
                >
                    Start Extra Time
                </button>

                <button
                    type="button"
                    onClick={handleEndClick}
                    className="px-6 py-2 bg-green-800 text-white rounded-lg shadow hover:bg-green-700 transition-all"
                >
                    Finish
                </button>
            </div>
        )}

        {(status !== 'pause' && status !== 'setExtraTime') && <div className="sand-clock"></div>}


        {status === 'extraTime' && (
            <div className="flex space-x-4 mt-5 mb-4">
                <button
                    type="button"
                    onClick={handlePauseClick}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition-all"
                >
                    Pause
                </button>
                <button
                    type="button"
                    onClick={handleGiveUpClick}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-all"
                >
                    Give up
                </button>
            </div>
        )}

        {status === 'pause' && (
            <div className="mt-4">
                <button
                    type="button"
                    onClick={handleGiveUpClick}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-all"
                >
                    Give up
                </button>
            </div>
        )}

        {status === 'end' && (
            <div className="flex space-x-4 mt-6">
                <button
                    type="button"
                    onClick={handleExtraTimeClick}
                    className="px-6 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition-all"
                >
                    Add extra time
                </button>
                <button
                    type="button"
                    onClick={handleEndClick}
                    className="px-6 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition-all"
                >
                    Finish
                </button>
            </div>
        )}



    </div>
}
