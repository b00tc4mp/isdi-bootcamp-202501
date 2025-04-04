import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import  { Login } from './view/Login.jsx'
import { Homepage } from './view/Homepage/index.jsx'

import { logic } from './logic/index.js'

function App() {

    const [loggedIn, setLoggedIn] = useState(null)
    const [showLanding, setShowLanding] = useState(true)
    
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            setLoggedIn(loggedIn)
        } catch (error) {
            console.error(error)

            alert(error.messsage)
        }
    }, [])

    const handleNavigateToRegister = () => {
        setShowLanding(false)
        navigate('/register')
    }

    const handleNavigateToLogin = () => {
        setShowLanding(false)
        navigate('/login')
    }
    const handleReturnClick = () => {
        setShowLanding(false)
        navigate('/landing')
    }
    const handleUserRegistered = () => {
        setShowLanding(false)
        navigate('/login')
    }
    const handleUserLoggedIn = () => {
        setShowLanding(false)
        setLoggedIn(true)
        navigate('/')
    }
    const handleUserLoggedOut = () => {
        setShowLanding(false)
        setLoggedIn(false)
        navigate('/login')
    }

    console.debug('App -> render')

    return <>
        {loggedIn !== null && <Routes>
            <Route path="/landing" element={loggedIn ? <Navigate to="/" /> : <Landing 
            onNavigateToRegister={handleNavigateToRegister}
            onNavigateToLogin={handleNavigateToLogin} /> } />

            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register
            onUserRegistered={handleUserRegistered}
            onReturnClick={handleReturnClick} /> } />

            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login 
            onUserLoggedIn={handleUserLoggedIn}
            onReturnClick={handleReturnClick} /> } />

            <Route path="/*" element={loggedIn ? <Homepage
            onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to={`${showLanding ? '/landing' : '/login'}`}/>} />
        </Routes>}
    </>
}

export default App