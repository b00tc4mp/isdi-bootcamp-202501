import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router'

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import { Login }from './view/Login'
import { Alert } from './view/Alert'
import { Confirm } from './view/Confirm'
import { RequireLogin } from './view/requireLogin'

import { Home } from './view/Home/index'
import { Menus } from './view/Home/Menus'
import { Orders } from './view/Home/Orders'
import { OrderForm } from './view/Home/OrderForm'
import { AddCredit } from './view/Home/AddCredit'

import { Context } from './context'


function App() {

    const [showLanding, setShowLanding] = useState(true)
    const [alertMessage, setAlertMessage] = useState('')
    const [confirmMessage, setConfirmMessage] = useState('')
    const [confirmState, setConfirmState] = useState(null)

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


    console.debug('App renderized')

    return <Context value={{
        alert: handleShowAlert,
        confirm: handleShowConfirm
    }}>
        <Routes>
            {/* Ruta a Landing */}
            <Route path="/" element={<Landing
                onNavigateToRegister={handleNavigateToRegister}
                onNavigateToLogin={handleNavigateToLogin} />} />

            {/*Ruta a Register*/}
            <Route path="/register" element={<Register
                onUserRegistered={handleUserRegistered}
                onNavigateToLogin={handleNavigateToLogin} />} />

            {/*Ruta a Login*/}
            <Route path="/login" element={<Login
                onUserLoggedIn={handleUserLoggedIn}
                onNavigateToRegister={handleNavigateToRegister} />} />

            {/*Ruta a Home*/}
            <Route path="/home" element={
                <RequireLogin>
                    <Home onUserLoggedOut={handleLogoutClick} />
                </RequireLogin>
            } />

            {/*Ruta a Menus*/}
            <Route path="/menus" element={
                <RequireLogin>
                    <Menus />
                </RequireLogin>
            } />

            {/*Ruta a orders*/}
            <Route path="/orders" element={
                <RequireLogin>
                    <Orders />
                </RequireLogin>
            } />

            {/*Ruta a make-orders*/}
            <Route path="/make-order/:menuId" element={
                <RequireLogin>
                    <OrderForm />
                </RequireLogin>
            } />

            {/*Ruta a add-credit*/}
            <Route path="/add-credit" element={
                <RequireLogin>
                    <AddCredit />
                </RequireLogin>
            } />

        </Routes>

        {alertMessage && <Alert title="⚠️" message={alertMessage} onAccepted={handleAlertAccepted} />}
        {confirmMessage && <Confirm title="❔" message={confirmMessage} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context>
}


export default App

