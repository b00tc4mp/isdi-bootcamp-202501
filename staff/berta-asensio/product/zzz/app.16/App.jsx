const { useState, useEffect } = React

import Landing from './view/Landing.jsx'
import Register from './view/Register.jsx'
import Login from './view/Login.jsx'
import Homepage from './view/Homepage.jsx'

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
    const handleReturnClick = () => setView('landing')
    const handleRegisterSubmit = () => setView('login')
    const handleLoginSubmit = () => setView('homepage')

    return <>
        {view === 'landing' && <Landing 
        onRegisterClick={handleRegisterClick}
        onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register
        onRegisterSubmit={handleRegisterSubmit}
        onReturnClick={handleReturnClick}/>}

        {view === 'login' && <Login 
        onLoginSubmit={handleLoginSubmit}
        onReturnClick={handleReturnClick}/>}

        {view === 'homepage' && <Homepage
        onReturnClick={handleReturnClick}/>}

    </>
}

export default App