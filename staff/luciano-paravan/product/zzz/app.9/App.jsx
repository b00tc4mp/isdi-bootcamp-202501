function App () {
    const[view, setView] = useState('landing')

    const handleRegisterClick = () => setView('register')
    const handleLoginClick = () => setView('login')

    return <>
    {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick}/>}
    
    {view === 'register' && <Register onLoginClick={handleLoginClick}/>}
    
    {view === 'login' && <Login onRegisterClick={handleRegisterClick}/>}
    
    {view === 'home' && <Home />}
    </>
}