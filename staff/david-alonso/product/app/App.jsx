// APP

import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Home } from './view/Home/index.jsx'
import { Alert } from './view/Alert'
import { Confirm } from './view/Confirm'

import { logic } from './logic/index.js'
import { Context } from './context'

// Maneja la navegacion entre las diverentes ventanas de la pagina
function App() {

    const [loggedIn, setLoggedIn] = useState(null)
    const [showLanding, setShowLanding] = useState(true)
    const [alertMessage, setAlertMessage] = useState('')
    const [confirmMessage, setConfirmMessage] = useState('')
    const [confirmState, setConfirmState] = useState(null)

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

    // Cambia hacia la pagina de Landing al cerrar sesion
    const handleUserLoggedOut = () => {
        setShowLanding(false)
        setLoggedIn(false)
        navigate('/landing')
    }

    const handleShowAlert = message => setAlertMessage(message)

    const handleAlertAccepted = () => setAlertMessage('')

    const handleShowConfirm = message => {
        return new Promise((resolve, _reject) => {
            setConfirmMessage(message)
            setConfirmState({ resolve })
        })
    }

    const handleConfirmAccepted = () => {
        confirmState.resolve(true)
        setConfirmMessage('')
        setConfirmState(null)
    }

    const handleConfirmCancelled = () => {
        confirmState.resolve(false)
        setConfirmMessage('')
        setConfirmState(null)
    }

    console.debug('App -> render')

    // *******
    return <Context value={{
        alert: handleShowAlert,
        confirm: handleShowConfirm
    }}>
        {loggedIn !== null && <Routes>

            <Route path="/landing" element={loggedIn ? <Navigate to="/" /> : <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />} />

            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered} />} />

            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn} />} />

            <Route path='/*' element={loggedIn ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to='/landing' />} />

        </Routes>}

        {alertMessage && <Alert title="⚠️" message={alertMessage} onAccepted={handleAlertAccepted} />}
        {confirmMessage && <Confirm title="❓" message={confirmMessage} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context>
}

export default App