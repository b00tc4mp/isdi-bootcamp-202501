// APP

import { useState, useEffect } from 'react'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Home } from './view/Home/index.jsx'

import { logic } from './logic/index.js'

// Maneja la navegacion entre las diverentes ventanas de la pagina
function App() {

    // Muestra la pagina principal
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

    // Cambia hacia la pagina de Registro para rgistrarse
    const handleNavigateToRegister = () => setView('register')

    // Cambia hacia la pagina de Login para iniciar sesion
    const handleNavigateToLogin = () => setView('login')

    // Cambia hacia la pagina de Login despues de haberse registrado
    const handleUserRegistered = () => setView('login')

    // Cambia hacia la pagina de Home despues de hacer login
    const handleUserLoggedIn = () => setView('home')

    // Cambia hacia la pagina de Login al cerrar sesion
    const handleUserLoggedOut = () => setView('login')

    console.debug('App -> render')

    return <>
        {view === 'landing' && <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />}

        {view === 'register' && <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered} />}

        {view === 'login' && <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn} />}

        {view === 'home' && <Home onUserLoggedOut={handleUserLoggedOut} />}

    </>
}

export default App