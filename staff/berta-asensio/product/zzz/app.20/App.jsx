// const { useState, useEffect } = React

import { useState, useEffect } from 'react'

import Landing from './view/Landing.jsx'
import Register from './view/Register.jsx'
import Login from './view/Login.jsx'
import Homepage from './view/Homepage/index.jsx'

import logic from './logic.js'

function App() {
    const [view, setView] = useState('landing')

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            loggedIn && setView('home')
        } catch (error) {
            console.error(error)

            alert(error.messsage)
        }
    }, [])

    const handleNavigateToRegister = () => setView('register')
    const handleNavigateToLogin = () => setView('login')
    const handleReturnClick = () => setView('landing')
    const handleUserRegistered = () => setView('login')
    const handleUserLoggedIn = () => setView('homepage')
    const handleUserLoggedOut = () => setView('login')

    return <>
        {view === 'landing' && <Landing 
        onNavigateToRegister={handleNavigateToRegister}
        onNavigateToLogin={handleNavigateToLogin} />}

        {view === 'register' && <Register
        onUserRegistered={handleUserRegistered}
        onReturnClick={handleReturnClick}/>}

        {view === 'login' && <Login 
        onUserLoggedIn={handleUserLoggedIn}
        onReturnClick={handleReturnClick}/>}

        {view === 'homepage' && <Homepage
        onUserLoggedOut={handleUserLoggedOut}/>}

    </>
}

export default App