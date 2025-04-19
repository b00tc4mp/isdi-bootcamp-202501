import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { CreateTimer } from './CreateTimer.jsx'
import { TimerOn } from './TimerOn.jsx'

export function Timer({ onUserLoggedOut }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()

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

    console.debug('Timer -> render')

    return <div>
        <Routes>
            <Route path="/" element={<CreateTimer onUserLoggedOut={handleUserLoggedOut} onCreateTimer={handleTimerCreated} />} />
            <Route path="/:timerId" element={<TimerOn onReturnClick={handleReturnClicked} onGiveUpClick={handleGiveUpClicked} />} />
        </Routes>
    </div>

}