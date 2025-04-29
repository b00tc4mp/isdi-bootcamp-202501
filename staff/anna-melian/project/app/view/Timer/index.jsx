import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'
import { logic } from '../../logic/index.js'
import { CreateTimer } from './CreateTimer.jsx'
import { ExtraTime } from './ExtraTime.jsx'
import { TimerOn } from './TimerOn.jsx'
import { useContext } from '../../context.js'


export function Timer({ onUserLoggedOut }) {
    const { alert, confirm } = useContext()


    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        try {
            logic.checkUserTimers()
                .then(resultTimerId => {
                    if (resultTimerId) {
                        navigate(`/${resultTimerId}`)
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

    const handleExtraTimeSetAndStart = timerId => {
        navigate(`/${timerId}/extraTime-on`)

    }

    console.debug('Timer -> render')

    return <div>
        <Routes>
            <Route path="/" element={<CreateTimer onUserLoggedOut={handleUserLoggedOut} onCreateTimer={handleTimerCreated} />} />

            <Route path="/:timerId" element={<TimerOn onReturnAccepted={handleReturnClicked} onGiveUpClick={handleGiveUpClicked} onFinishClick={handleFinishClicked} onExtraTimeSetAndStarted={handleExtraTimeSetAndStart} />} />

            <Route path="/:timerId/extraTime-on" element={<ExtraTime onFinishClick={handleFinishClicked} onGiveUpClick={handleGiveUpClicked} />} />
        </Routes>
    </div>

}


