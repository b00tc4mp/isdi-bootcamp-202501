import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import { Login }from './view/Login'

import { logic } from './logic/index'
import { Home } from './view/Home/index'
import { Menus } from './view/Home/Menus'
import { Orders } from './view/Home/Orders'
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

   const handleUserRegistered = () => {
    setShowLanding(false)
    navigate('/login')
   }

   const handleUserLoggedIn = () => {
    setShowLanding(false)
    navigate('/home')
   }

   const handleLogoutClick = () => {
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
            onUserRegistered={handleUserRegistered}
            onReturnClick={handleReturnClick} />} />

            {/*Ruta a Login*/}
            <Route path="/login" element={<Login
                onUserLoggedIn={handleUserLoggedIn}
                onReturnClick={handleReturnClick} />} />

            {/*Ruta a Home*/}
            <Route path="/home" element={<Home
            onUserLoggedOut={handleLogoutClick} />} />

            {/*Ruta a Menus*/}
            <Route path="/menus" element={<Menus />} />

            {/*Ruta a orders*/}
            <Route path="/orders" element={<Orders />} />
                  
        </Routes>
    </div>

}


export default App

