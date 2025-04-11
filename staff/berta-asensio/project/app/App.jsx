import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import { Login }from './view/Login'

import { logic } from './logic/index'
// import { Context } from './context'

function App() {

    // const [loggedIn, setLoggedIn] = useState(null)
    const [showLanding, setShowLanding] = useState(true)

    const navigate = useNavigate()

   const handleNavigateToRegister = () => {
    navigate('/register')
   }

   const handleNavigateToLogin = () => {
    navigate('/login')
   }

   const handleReturnClick = () => {
    setShowLanding(true)
    navigate('/')
   }

   console.debug('App renderized')

    return <div>
        <Routes>
            {/* Ruta a Landing */}
            <Route path="/" element={<Landing
                onNavigateToRegister={handleNavigateToRegister}
                onNavigateToLogin={handleNavigateToLogin} />} />
            
            {/*Ruta a Register*/}
            <Route path="/register" element={<Register
                onReturnClick={handleReturnClick} />} />

            {/*Ruta a Login*/}
            <Route path="/login" element={<Login
                onNavigateToRegister={handleNavigateToRegister} />} />
            
        </Routes>
    </div>

}


export default App

