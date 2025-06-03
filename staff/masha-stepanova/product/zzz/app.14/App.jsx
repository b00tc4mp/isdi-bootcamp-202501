import { useState, useEffect } from 'react'

import { Landing } from './view/custom/Landing.jsx'
import { Register } from './view/custom/Register.jsx'
import { Login } from './view/custom/Login.jsx'
import { Home } from './view/Home/index.jsx'
import { Profile } from './view/custom/Profile.jsx'

import { logic } from './logic/index.js'

export function App() {
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

    const handleUserRegistered = () => setView('login')

    const handleUserLoggedIn = () => setView('home')

    const handleUserLoggedOut = () => setView('login')

    const handleNavigateToProfile = () => setView('profile')

    const handleCreatePostCanceled = () => setView('home')

    // const handleCreatedPost = () => setView('home')

    const handleNavigateToHome = () => setView('home')

    return <>
        {view === 'landing' && <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />}

        {view === 'register' && <Register onUserRegistered={handleUserRegistered} onNavigateToLogin={handleNavigateToLogin} />}

        {view === 'login' && <Login onUserLoggedIn={handleUserLoggedIn} onNavigateToRegister={handleNavigateToRegister} />}

        {view === 'home' && <Home onUserLoggedOut={handleUserLoggedOut} onNavigateToProfile={handleNavigateToProfile} />}

        {view === 'profile' && <Profile onUserLoggedOut={handleUserLoggedOut} onNavigateToHome={handleNavigateToHome} onCreatePostCanceled={handleCreatePostCanceled} />}
    </>
}