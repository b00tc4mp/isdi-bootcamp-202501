import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Home } from './view/Home/index.jsx'
import { Alert } from './view/Alert.jsx'
import {Confirm} from './view/Confirm.jsx'

import { logic } from './logic/index.js'
import { Context } from './context.js'

function App() {
    const[loggedIn, setLoggedIn] = useState(null)
    const[showLanding, setShowLanding] = useState(true)
    const[alertMessage, setAlertMessage] = useState('')
    const[confirmMessage, setConfirmMessage] = useState('')
    const[confirmState, setConfirmState] = useState(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            setLoggedIn(loggedIn) //seteamos cuando logginea y repintamos
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleNavigateToRegister = () => {
        setShowLanding(false)
        navigate('/register')}
    
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
        navigate('/')
    }

    const handleUserLoggedOut = () => {
        setShowLanding(false)
        setLoggedIn(false)
        navigate('login')
    }

    const handleAlertAccepted = () => setFeedback('')
    
    const handleShowAlert = message => setAlertMessage(message)
    
    const handleShowConfirm = message => {
        return new Promise((resolve, _reject) => {
            setConfirmMessage(message)
            setConfirmState({resolve}) //Es necesario pasarla como un objeto, no se puede pasar una func directamente
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

    //const defaultRoute = loggedIn === null ? '/landing' : '/login'

    //En el contexto estoy proveyendo un valor que es este objeto, que tiene una propiedad alert, que es la funcion handleShowAlert 
    return <Context value={{ 
        alert: handleShowAlert, 
        confirm: handleShowConfirm 
        }}>
        {loggedIn !== null && <Routes>
            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered}/>} />
            
            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn}/>} />
            
            <Route path="/*" element={loggedIn ? <Home onUserLoggedOut={handleUserLoggedOut} /> : showLanding ? <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin}/> : <Navigate to='/login' /> } />
        </Routes>}

        {alertMessage && <Alert title="⚠️" message={alertMessage} onAccepted={handleAlertAccepted} />}

        {confirmMessage && <Confirm title="？" message={confirmMessage} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context>
}
//En el return definimos que si esta loggedIn va a ir siempre a home

//la ruta /* dice que si la ruta no machea con landgir, register, login, pero machea la ruta raiz o la ruta raiz + algo se queda en home

export default App