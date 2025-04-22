import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import { Login } from './view/Login'
import { Home } from './view/Home'

import { logic } from './logic'

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
    setLoggedIn(true)
    setShowLanding(false)
    navigate('/home')
  }

  const handleUserLoggedOut = () => {
    setLoggedIn(false)
    setShowLanding(false)
    navigate('/login')
  }

  return (
    <>
      {loggedIn !== null && (
        <Routes>
          <Route path='/' element={loggedIn ? <Navigate to='/home' /> : <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />} />

          <Route path='/register' element={loggedIn ? <Navigate to='/home' /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered} />} />

          <Route path='/login' element={loggedIn ? <Navigate to='/home' /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn} />} />

          <Route path='/*' element={loggedIn ? <Home onUserLoggedOut={handleUserLoggedOut} /> : showLanding ? <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} /> : <Navigate to='/login' />} />
        </Routes>
      )}
    </>
  )
}

export default App
