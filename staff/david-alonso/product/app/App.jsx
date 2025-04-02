// APP

import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Home } from './view/Home/index.jsx'

import { logic } from './logic/index.js'

// Maneja la navegacion entre las diverentes ventanas de la pagina
function App() {

    const [loggedIn, setLoggedIn] = useState(null)
    const [showLanding, setShowLanding] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            setLoggedIn(loggedIn)
        } catch (error) {
            console.error(error)

            alert(error.messsage)
        }
    }, [])

    // Cambia hacia la pagina de Registro para rgistrarse
    const handleNavigateToRegister = () => {
        setShowLanding(false)
        navigate('/register')
    }

    // Cambia hacia la pagina de Login para iniciar sesion
    const handleNavigateToLogin = () => {
        setShowLanding(false)
        navigate('/login')
    }

    // Cambia hacia la pagina de Login despues de haberse registrado
    const handleUserRegistered = () => {
        setShowLanding(false)
        navigate('/login')
    }

    // Cambia hacia la pagina de Home despues de hacer login
    const handleUserLoggedIn = () => {
        setShowLanding(false)
        setLoggedIn(true)
        navigate('/')
    }

    // Cambia hacia la pagina de Login al cerrar sesion
    const handleUserLoggedOut = () => {
        setShowLanding(false)
        setLoggedIn(false)
        navigate('/register')
    }

    console.debug('App -> render')

    // *******
    return <>
        {loggedIn !== null && <Routes>

            <Route path="/landing" element={loggedIn ? <Navigate to="/" /> : <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />} />

            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered} />} />

            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn} />} />

            <Route path='/*' element={loggedIn ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to='/landing' />} />

        </Routes>}
    </>
}

export default App