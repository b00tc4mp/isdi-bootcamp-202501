import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Home } from './view/Home/index.jsx'

import { logic } from './logic/index.js'

function App() {
    const[loggedIn, setLoggedIn] = useState(null)
    const[showLanding, setShowLanding] = useState(true)
    
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

    console.debug('App -> render')

    //const defaultRoute = loggedIn === null ? '/landing' : '/login'

    return <>
        {loggedIn !== null && <Routes>
            <Route path="/landing" element={loggedIn ? <Navigate to="/" /> : <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin}/>} />
            
            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered}/>} />
            
            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn}/>} />
            
            <Route path="/*" element={loggedIn ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to={`${showLanding ? '/landing' : '/login'}` }/>} />
        </Routes>}
    </>
}
//En el return definimos que si esta loggedIn va a ir siempre a home

//la ruta /* dice que si la ruta no machea con landgir, register, login, pero machea la ruta raiz o la ruta raiz + algo se queda en home

export default App