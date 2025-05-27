import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router';

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import { Login } from './view/Login'
import { Home } from './view/Home/index'
import { Alert } from './view/Alert';
import { Confirm } from './view/Confirm';

import { logic } from './logic/index';
import { Context } from './context';

export function App() {
    const [loggedIn, setLoggedIn] = useState(null);
    const [showLanding, setShowLanding] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');
    const [confirmState, setConfirmState] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn();

            setLoggedIn(loggedIn);
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    })

    const handleNavigateToRegister = () => {
        setShowLanding(false);
        navigate('/register');
    };

    const handleNavigateToLogin = () => {
        setShowLanding(false);
        navigate('/login');
    }

    const handleUserRegistered = () => {
        setShowLanding(false);
        navigate('/login');
    };

    const handleUserLoggedIn = () => {
        setShowLanding(false);
        setLoggedIn(true);
        navigate('/');
    }

    const handleUserLoggedOut = () => {
        setShowLanding(false);
        setLoggedIn(false);
        navigate('/login')
    }

    const handleShowAlert = message => setAlertMessage(message);

    const handleAlertAccepted = () => setAlertMessage('');

    const handleShowConfirm = message => {
        return new Promise((resolve, _reject) => {
            setConfirmMessage(message);
            setConfirmState({ resolve });
        })
    }

    const handleConfirmAccepted = () => {
        confirmState.resolve(true);
        setConfirmMessage('');
        setConfirmState(null);
    }

    const handleConfirmCancelled = () => {
        confirmState.resolve(false);
        setConfirmMessage('');
        setConfirmState(null);
    }

    return <Context value={{
        alert: handleShowAlert,
        confirm: handleShowConfirm
    }}>
        {loggedIn !== null && <Routes>
            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered} />} />

            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn} />} />

            <Route path="/*" element={loggedIn ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />} />
        </Routes>}

        {alertMessage && <Alert title="⚠️" message={alertMessage} onAccepted={handleAlertAccepted} />}
        {confirmMessage && <Confirm title="❔" message={confirmMessage} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context>
}