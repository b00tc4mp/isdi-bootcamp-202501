import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { CreateTimer } from './CreateTimer.jsx'

export function Timer() {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    console.debug('Timer -> render')

    return <div>
        <Routes>
            <Route path="/create-timer" element={<CreateTimer />} />
        </Routes>
    </div>

}