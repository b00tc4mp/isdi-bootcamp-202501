import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/custom/Landing.jsx'
import { Register } from './view/custom/Register.jsx'
import { Login } from './view/custom/Login.jsx'
import { Home } from './view/Home/index.jsx'
import { Alert } from './Alert.jsx'
import { Confirm } from './Confirm.jsx'

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
        navigate('/home')
    }

    const handleUserLoggedOut = () => {
        setShowLanding(false)
        setLoggedIn(false)
        navigate('/login')
    }

    const handleNavigateToProfile = () => {
        setShowLanding(false)
        navigate('/profile')
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
            {/* <Route path="/landing" element={loggedIn ? <Navigate to="/" /> : <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />} /> */}

            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onUserRegistered={handleUserRegistered} onNavigateToLogin={handleNavigateToLogin} />} />

            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onUserLoggedIn={handleUserLoggedIn} onNavigateToRegister={handleNavigateToRegister} />} />

            <Route path="/*" element={loggedIn ? <Home onUserLoggedOut={handleUserLoggedOut} /> : showLanding ? <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} /> : <Navigate to='/login' />} />
        </Routes>}

        {alertMessage && <Alert title="⚠️" message={alertMessage} onAccepted={handleAlertAccepted} />}
        {confirmMessage && <Confirm title="❓" message={confirmMessage} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context >

    // return <>
    //     {view === 'landing' && <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />}

    //     {view === 'register' && <Register onUserRegistered={handleUserRegistered} onNavigateToLogin={handleNavigateToLogin} />}

    //     {view === 'login' && <Login onUserLoggedIn={handleUserLoggedIn} onNavigateToRegister={handleNavigateToRegister} />}

    //     {view === 'home' && <Home onUserLoggedOut={handleUserLoggedOut} onNavigateToProfile={handleNavigateToProfile} />}

    //     {view === 'profile' && <Profile onUserLoggedOut={handleUserLoggedOut} onNavigateToHome={handleNavigateToHome} onCreatePostCanceled={handleCreatePostCanceled} />}
    // </>
}

export default App