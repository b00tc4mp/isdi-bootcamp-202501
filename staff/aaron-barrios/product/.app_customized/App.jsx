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

    const handleNavigateToRegister = () => setView('register')

    const handleNavigateToLogin = () => setView('login')

    const handleUserRegistered = () => setView('login')

    const handleUserLoggedIn = () => setView('home')

    const handleUserLoggedOut = () => setView('login')

    const handleProfileClick = () => setView('profile')

    const handleHomeClick = () => setView('home')

    return <>
        {view === 'landing' && <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />}

        {view === 'register' && <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered} />}

        {view === 'login' && <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn} />}

        {view === 'home' && <Home onUserLoggedOut={handleUserLoggedOut} onProfileClick={handleProfileClick} />}

        {view === 'profile' && <Profile onHomeClick={handleHomeClick} />}
    </>
}

export default App