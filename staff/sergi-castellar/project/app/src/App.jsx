import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './components/view/Landing'
import { Register } from './components/view/Register'
import { Login } from './components/view/Login'
import { Home } from './components/view/Home'
import { Alert } from './components/Alert'
import { Confirm } from './components/Confirm'

import { logic } from './logic'
import { Context } from './context'

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
    setLoggedIn(true)
    setShowLanding(false)
    navigate('/home')
  }

  const handleUserLoggedOut = () => {
    setLoggedIn(false)
    setShowLanding(false)
    navigate('/login')
  }

  const handleShowAlert = (message) => setAlertMessage(message)

  const handleAlertAccepted = () => setAlertMessage('')

  const handleShowConfirm = (message) => {
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

  return (
    <Context
      value={{
        alert: handleShowAlert,
        confirm: handleShowConfirm,
      }}>
      {loggedIn !== null && (
        <Routes>
          <Route path='/' element={loggedIn ? <Navigate to='/home' /> : <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />} />

          <Route path='/register' element={loggedIn ? <Navigate to='/home' /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered} />} />

          <Route path='/login' element={loggedIn ? <Navigate to='/home' /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn} />} />

          <Route path='/*' element={loggedIn ? <Home onUserLoggedOut={handleUserLoggedOut} /> : showLanding ? <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} /> : <Navigate to='/login' />} />
        </Routes>
      )}

      {alertMessage && <Alert title='Tiny Reminder' message={alertMessage} onAccepted={handleAlertAccepted} />}
      {confirmMessage && <Confirm title='Take a Moment' message={confirmMessage} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context>
  )
}

export default App
