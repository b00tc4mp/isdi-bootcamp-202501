import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Home } from './view/Home/index.jsx'

import { logic } from './logic/index.js'

function App() {
    const[view, setView] = useState('landing')
    const[loggedIn, setLoggedIn] = useState(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            setLoggedIn(loggedIn)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    useEffect(() => {
        switch(view) {
            case 'landing':
                navigate('/landing')
                break
            case 'register':
                navigate('/register')
                break
            case 'login':
                navigate('/login')
                break
            case 'home':
                navigate('/')
                break
        }
    }, [view])

    const handleNavigateToRegister = () => setView('register')
    
    const handleNavigateToLogin = () => setView('login')

    const handleUserRegistered = () => setView('login')

    const handleUserLoggedIn = () => {
        setLoggedIn(true)
        setView('home')
    }

    const handleUserLoggedOut = () => {
        setLoggedIn(false)
        setView('login')
    }

    console.debug('App -> render')

    return <Routes>
        <Route path="/landing" element={loggedIn ? <Navigate to="/" /> : <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin}/>} />
        
        <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered}/>} />
        
        <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn}/>} />
        
        <Route path="/" element={loggedIn ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to="/login" />} />
    </Routes>
}
//En el return definimos que si esta loggedIn va a ir siempre a home

export default App