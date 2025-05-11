import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'
import { logic } from '../../logic/index.js'
import { CreateTimer } from './CreateTimer.jsx'
import { ExtraTime } from './ExtraTime.jsx'
import { TimerOn } from './TimerOn.jsx'
import { useContext } from '../../context.js'
import { SessionHistory } from './SessionHistory.jsx'


export function Timer({ onUserLoggedOut }) {
    const { alert, confirm } = useContext()


    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        try {
            logic.checkUserTimers()
                .then(resultTimerId => {
                    if (resultTimerId) {
                        logic.getTimer(resultTimerId)
                            .then(timer => {
                                if (timer.status === 'extraTime') {
                                    navigate(`/${resultTimerId}/extraTime-on`)
                                } else if (timer.extraTimes && timer.status === 'pause') {
                                    navigate(`/${resultTimerId}/extraTime-on`)
                                } else {
                                    navigate(`/${resultTimerId}`)

                                }
                            })
                            .catch(error => {
                                console.error(error)
                                alert(error.message)
                            })
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
    }, [])

    const handleUserLoggedOut = () => {
        onUserLoggedOut()
    }
    const handleSessionHistoryClick = () => {
        navigate('/session-history')
    }
    const handleTimerCreated = timerId => {
        navigate(`/${timerId}`)
    }

    const handleReturnClicked = () => {
        navigate('/')
    }

    const handleGiveUpClicked = () => {
        navigate('/')
    }

    const handleFinishClicked = () => {
        navigate('/')
    }

    const handleAddExtraTime = timerId => {
        navigate(`/${timerId}/extraTime-on`)

    }

    const handleTimerClick = () => {
        navigate('/')
    }

    console.debug('Timer -> render')

    return <div>
        <Routes>
            <Route path="/" element={<CreateTimer onUserLoggedOut={handleUserLoggedOut} onCreateTimer={handleTimerCreated} onSessionHistoryClick={handleSessionHistoryClick} />} />

            <Route path="/session-history" element={<SessionHistory onMenuTimerClick={handleTimerClick} onUserLoggedOut={handleUserLoggedOut} />} />

            <Route path="/:timerId" element={<TimerOn onReturnAccepted={handleReturnClicked} onGiveUpClick={handleGiveUpClicked} onFinishClick={handleFinishClicked} onAddExtraTime={handleAddExtraTime} />} />

            <Route path="/:timerId/extraTime-on" element={<ExtraTime onFinishClick={handleFinishClicked} onGiveUpClick={handleGiveUpClicked} />} />


        </Routes>
    </div>

}


