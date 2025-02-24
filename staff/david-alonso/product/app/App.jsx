// APP

// Maneja la navegacion entre las diverentes ventanas de la pagina
function App() {

    // Muestra la pagina principal
    const [view, setView] = useState('landing')

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
        {view === 'landing' && <Landing onRegisterClick={handleLoginClick} onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register onLoginClick={handleLoginClick} onRegisterSubmit={handleRegisterSubmit} />}

        {view === 'login' && <Login onRegisterClick={handleRegisterClick} onLoginSubmit={handleLoginSubmit} />}

        {view === 'home' && <Home onLogoutClick={handleLogoutClick} />}

    </>
}