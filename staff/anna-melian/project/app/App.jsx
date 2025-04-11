import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Timer } from './view/Timer/index.jsx'

function App() {
    const [showLanding, setShowLanding] = useState(true)

    const navigate = useNavigate()

    const handleNavigateToRegister = () => {
        setShowLanding(false)
        navigate('/register')
    }

    const handleNavigateToLogin = () => {
        setShowLanding(false)
        navigate('/login')
    }

    console.debug('App -> render')

    return <>
        <Routes>
            <Route path="/register" element={<Register onNavigateToLogin={handleNavigateToLogin} />} />

            <Route path="/login" element={<Login onNavigateToRegister={handleNavigateToRegister} />} />

            <Route path="/" element={<Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />} />

            <Route path="/*" element={<Timer />} />

        </Routes>



    </>
}

export default App