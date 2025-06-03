const { useState, useEffect } = React

import Landing from './view/custom/Landing.jsx'
import Register from './view/custom/Register.jsx'
import Login from './view/custom/Login.jsx'
import Home from './view/custom/Home.jsx'
import Profile from './view/custom/Profile.jsx'

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

    const handleRegisterClick = () => setView('register')

    const handleLoginClick = () => setView('login')

    const handleRegisterSubmit = () => setView('login')

    const handleLoginSubmit = () => setView('home')

    const handleLogoutClick = () => setView('login')

    const handleProfileClick = () => setView('profile')

    const handleCancelClick = () => setView('home')

    const handleAddPostSubmit = () => setView('home')

    const handleHomeClick = () => setView('home')

    return <>
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register onRegisterSubmit={handleRegisterSubmit} onLoginClick={handleLoginClick} />}

        {view === 'login' && <Login onLoginSubmit={handleLoginSubmit} onRegisterClick={handleRegisterClick} />}

        {view === 'home' && <Home onLogoutClick={handleLogoutClick} onProfileClick={handleProfileClick} onCancelClick={handleCancelClick} onAddPostSubmit={handleAddPostSubmit} />}

        {view === 'profile' && <Profile onLogoutClick={handleLogoutClick} onHomeClick={handleHomeClick} />}
    </>
}

export default App