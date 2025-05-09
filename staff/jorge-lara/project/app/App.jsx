import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router';

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import { Login } from './view/Login'
import { Home } from './view/Home/index'

import { logic } from './logic/index';

export function App() {
    const [loggedIn, setLoggedIn] = useState(null);
    const [showLanding, setShowLanding] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn();

            setLoggedIn(loggedIn);
        } catch (error) {
            console.error(error);
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

    return <>
        {loggedIn !== null && <Routes>
            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered} />} />

            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn} />} />

            <Route path="/*" element={loggedIn ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Landing onNavigateToRegister={handleNavigateToRegister} onNavigateToLogin={handleNavigateToLogin} />} />
        </Routes>}
    </>
}