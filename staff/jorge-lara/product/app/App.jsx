const { useState, useEffect } = React

import Landing from './view/Landing.jsx'
import Register from './view/Register.jsx'
import Login from './view/Login.jsx'
import Home from './view/Home.jsx'
import CreatePost from './view/CreatePost.jsx'

import logic from './logic.js'

function App() {
    const [view, setView] = useState('landing');

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn();

            loggedIn && setView('home')
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }, [])

    const handleRegisterClick = () => setView('register');
    const handleRegisterSubmit = () => setView('login');

    const handleLoginClick = () => setView('login');

    const handleLoginSubmit = () => setView('home');

    const handleLogoutClick = () => setView('landing');

    const handleAddPostClick = () => setView('createPost');

    const handleCancelPostSubmit = () => setView('home');

    const handleCreatePostSubmit = () => setView('home');

    return <>
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register onLoginClick={handleLoginClick} onRegisterSubmit={handleRegisterSubmit} />}

        {view === 'login' && <Login onRegisterClick={handleRegisterClick} onLoginSubmit={handleLoginSubmit} />}

        {view === 'home' && <Home onLogoutClick={handleLogoutClick} onAddPostClick={handleAddPostClick} />}

        {view === 'createPost' && <CreatePost onCancelClick={handleCancelPostSubmit} onAddPostSubmit={handleCreatePostSubmit} />}

    </>
}

export default App;