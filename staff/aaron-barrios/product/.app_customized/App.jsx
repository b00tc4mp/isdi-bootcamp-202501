const { useState, useEffect } = React

import Landing from './view/Landing.jsx'
import Register from './view/Register.jsx'
import Login from './view/Login.jsx'
import Home from './view/Home.jsx'
import Profile from './view/Profile.jsx'

import logic from './logic.js'

function App() {
    const [view, setView] = useState('landing')

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

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

    const handleProfileClick = () => setView('profile')

    const handleHomeClick = () => setView('home')

    return <>
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register onLoginClick={handleLoginClick} onRegisterSubmit={handleRegisterSubmit} />}

        {view === 'login' && <Login onRegisterClick={handleRegisterClick} onLoginSubmit={handleLoginSubmit} />}

        {view === 'home' && <Home onLogoutClick={handleLogoutClick} onProfileClick={handleProfileClick} />}

        {view === 'profile' && <Profile onHomeClick={handleHomeClick} />}
    </>
}

export default App