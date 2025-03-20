import { useState, useEffect } from 'react'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Home } from './view/Home/index.jsx'

import { logic } from './logic/index.js'

export function App () {
    const[view, setView] = useState('landing')

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            loggedIn && setView('home')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleNavigateToRegister = () => setView('register')
    
    const handleNavigateToLogin = () => setView('login')

    const handleUserRegistered = () => setView('login')

    const handleUserLoggedIn = () => setView('home')

    const handleUserLoggedOut = () => setView('login')

    console.debug('App -> render')

    return <>
    {view === 'landing' && <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin}/>}
    
    {view === 'register' && <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered}/>}
    
    {view === 'login' && <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn}/>}
    
    {view === 'home' && <Home onUserLoggedOut={handleUserLoggedOut}/>}
    </>
}
