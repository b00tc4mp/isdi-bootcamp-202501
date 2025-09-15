import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Timer } from './view/Timer/index.jsx'
import { Alert } from './view/Alert.jsx'
import { Confirm } from './view/Confirm.jsx'

import { logic } from './logic/index.js'
import { Context } from './context.js'


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

    const handleNavigateToRegister = () => {
        setShowLanding(false)
        navigate('/register')
    }

    const handleNavigateToLogin = () => {
        setShowLanding(false)
        navigate('/login')
    }

    const handleUserRegistered = () => {
        setShowLanding(false)
        navigate('/login')
    }

    const handleUserLoggedIn = () => {
        setShowLanding(false)
        setLoggedIn(true)
        navigate('/create-timer')
    }

    const handleUserLoggedOut = () => {
        setShowLanding(false)
        setLoggedIn(false)
        navigate('/login')
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

    return <Context value={{
        alert: handleShowAlert,
        confirm: handleShowConfirm
    }}>
        {loggedIn !== null && <Routes>
            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered} />} />

            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn} />} />

            <Route path='/*' element={loggedIn ? <Timer onUserLoggedOut={handleUserLoggedOut} /> : <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />} />

        </Routes>}

        {alertMessage && <Alert title="⚠️" message={alertMessage} onAccepted={handleAlertAccepted} />}
        {confirmMessage && <Confirm title="❔" message={confirmMessage} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}


    </Context>
}

export default App