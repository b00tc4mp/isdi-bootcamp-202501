
/**
 * Este componente va a manejar mis vistas y navegacion en consecuente con los eventos de los botones de Register, Login y Logout
 */
function App() {
    // Importo React y useState
    const useState = React.useState
    // Manejo el estado de las vistas con useState y seteo la vista inicial en 'landing' 
    const [view, setView] = useState('landing')


    // Creo las funciones que manejan los eventos de los botones de Register, Login y Logout
    // Cambiando la vista a 'register', 'login' y 'home' respectivamente
    const handleRegisterClick = () => setView('register')

    const handleLoginClick = () => setView('login')

    const handleRegisterSubmit = () => setView('login')

    const handleLoginSubmit = () => setView('home')

    const handleLogoutClick = () => setView('login')

    console.debug('App -> render')




    // Renderizo las vistas de Landing, Register, Login y Home segun el estado de la vista
    //las manejo con un condicional relacionado al estado de la vista
    return <>

       
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register onLoginClick={handleLoginClick} onRegisterSubmit={handleRegisterSubmit} />}

        {view === 'login' && <Login onRegisterClick={handleRegisterClick} onLoginSubmit={handleLoginSubmit} />}

        {view === 'home' && <Home onLogoutClick={handleLogoutClick} />}
    </>
}