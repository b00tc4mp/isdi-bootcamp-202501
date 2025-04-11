import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { CreateTimer } from './CreateTimer.jsx'

export function Timer({ onUserLoggedOut }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleUserLoggedOut = () => {
        onUserLoggedOut()
    }

    console.debug('Timer -> render')

    return <div>
        <Routes>
            <Route path="/" element={<CreateTimer onUserLoggedOut={handleUserLoggedOut} />} />
        </Routes>
    </div>

}