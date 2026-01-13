const { useState, useEffect } = React

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

    const handleRegisterClick = () => setView('register')
    
    const handleLoginClick = () => setView('login')
    
    const handleRegisterSubmit = () => setView('login')
    
    const handleLoginSubmit = () => setView('home')
    
    const handleLogoutClick = () => setView('login')

    return <>
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick}/>}

        {view === 'register' && <Register onLoginClick={handleLoginClick} onRegisterSubmit={handleRegisterSubmit}/>}

        {view === 'login' && <Login onRegisterClick={handleRegisterClick} onLoginSubmit={handleLoginSubmit}/>}

        {view === 'home' && <Home onLogoutClick={handleLogoutClick}/>}
    </>
}

export default App