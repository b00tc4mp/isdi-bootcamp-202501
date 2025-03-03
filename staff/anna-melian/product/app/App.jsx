const { useState, useEffect } = React

function App() {
    const [view, setView] = useState('landing')


    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            loggedIn && setView('home')
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    })





    const handleRegisterClick = () => setView('register')

    const handleLoginClick = () => setView('login')

    const handleRegisterSubmit = () => setView('login')

    const handleLoginSubmit = () => setView('home')

    const handleLogoutClick = () => setView('landing')

    const handleDeleteProfileClick = () => setView('landing')

    console.debug('App -> render')

    return <>
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register onLoginClick={handleLoginClick} onRegisterSubmit={handleRegisterSubmit} />}

        {view === 'login' && <Login onRegisterClick={handleRegisterClick} onLoginSubmit={handleLoginSubmit} />}

        {view === 'home' && <Home onLogoutClick={handleLogoutClick} onDeleteProfileClick={handleDeleteProfileClick} />}
    </>
}