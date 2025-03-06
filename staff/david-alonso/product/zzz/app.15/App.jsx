// APP

const { useState, useEffect } = React

// Maneja la navegacion entre las diverentes ventanas de la pagina
function App() {

    // Muestra la pagina principal
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

    // Cambia hacia la pagina de Registro para rgistrarse
    const handleRegisterClick = () => setView('register')

    // Cambia hacia la pagina de Login para iniciar sesion
    const handleLoginClick = () => setView('login')

    // Cambia hacia la pagina de Login despues de haberse registrado
    const handleRegisterSubmit = () => setView('login')

    // Cambia hacia la pagina de Home despues de hacer login
    const handleLoginSubmit = () => setView('home')

    // Cambia hacia la pagina de Login al cerrar sesion
    const handleLogoutClick = () => setView('login')

    console.debug('App -> render')

    return <>
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register onLoginClick={handleLoginClick} onRegisterSubmit={handleRegisterSubmit} />}

        {view === 'login' && <Login onRegisterClick={handleRegisterClick} onLoginSubmit={handleLoginSubmit} />}

        {view === 'home' && <Home onLogoutClick={handleLogoutClick} />}

    </>
}