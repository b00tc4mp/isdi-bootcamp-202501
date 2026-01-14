import { useState, useEffect } from 'react'
import logic from './logic.js'
import Landing from '../../app.1/view/Landing.jsx'
import Login from './view/Login.jsx'
import Register from './view/Register.jsx'
import Home from './view/Home.jsx'

function App () {
    const[view, setView] = useState('landing')

    useEffect(() => {
        try {
            const loggedId = logic.isUserLoggedIn()

            loggedIn && setView('home')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleRegisterClick = () => setView('register')
    const handleLoginClick = () => setView('login')

    const handleRegisterSubmit = () => setView('login')

    const handleLoginSubmit = () => setView('home')

    const handleLogoutClick = () => setView('login')

    console.debug('App -> render')

    return <>
    {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick}/>}
    
    {view === 'register' && <Register onLoginClick={handleLoginClick} onRegisterSubmit={handleRegisterSubmit}/>}
    
    {view === 'login' && <Login onRegisterClick={handleRegisterClick} onLoginSubmit={handleLoginSubmit}/>}
    
    {view === 'home' && <Home onLogoutClick={handleLogoutClick}/>}
    </>
}

export default App