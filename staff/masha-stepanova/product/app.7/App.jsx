const { useState, useEffect } = React

function App() {
    const [view, setView] = useState('landing')

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            loggedIn && setView('home')
        } catch (error) {
            console.error(error)

            alert(error.messsage)
        }
    }, [])

    const handleRegisterClick = () => setView('register')

    const handleLoginClick = () => setView('login')

    const handleRegisterSubmit = () => setView('login')

    const handleLoginSubmit = () => setView('home')

    const handleLogoutClick = () => setView('login')

    const handleProfileClick = () => setView('profile')

    const handleCancelClick = () => setView('home')

    const handleAddPostSubmit = () => setView('home')

    const handleHomeClick = () => setView('home')

    return <>
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register onRegisterSubmit={handleRegisterSubmit} onLoginClick={handleLoginClick} />}

        {view === 'login' && <Login onLoginSubmit={handleLoginSubmit} onRegisterClick={handleRegisterClick} />}

        {view === 'home' && <Home onLogoutClick={handleLogoutClick} onProfileClick={handleProfileClick} onCancelClick={handleCancelClick} onAddPostSubmit={handleAddPostSubmit} />}

        {view === 'profile' && <Profile onLogoutClick={handleLogoutClick} onHomeClick={handleHomeClick} />}
    </>
}