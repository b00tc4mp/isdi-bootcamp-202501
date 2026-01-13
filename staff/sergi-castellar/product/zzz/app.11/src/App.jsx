import { useState, useEffect } from 'react'

import logic from './logic.js'
import Landing from './view/Landing.jsx'
import Login from './view/Login.jsx'
import Register from './view/Register.jsx'
import Home from './view/Home.jsx'


function App() {
    const [view, setView] = useState('landing')
    
    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()
            
            if (loggedIn) setView('home')
        } catch (error) {
            logic.helper.handleError(error)
        }
    }, [])

    const handleNavigateToRegister = () => setView('register')
    
    const handleNavigateToLogin = () => setView('login')
    
    const handleUserRegistered = () => setView('login')
    
    const handleUserLoggedIn = () => setView('home')
    
    const handleUserLoggedOut = () => setView('login')

    return <>
        {view === 'landing' && <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin}/>}

        {view === 'register' && <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered}/>}

        {view === 'login' && <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn}/>}

        {view === 'home' && <Home onUserLoggedOut={handleUserLoggedOut}/>}
    </>
}

export default App