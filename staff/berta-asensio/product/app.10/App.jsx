function App() {
    const [view, setView] = useState('landing')

    const handleRegisterClick = () => setView
    ('register')
    const handleLoginClick = () => setView
    ('login')
    const handleReturnClick = () => setView
    ('landing')
    const handleLoginHomepageClick = () => setView
    ('homepage')
    const handleCreatePostClick = () => setView
    ('create-post')

    return <>
        {view === 'landing' && <Landing 
        onRegisterClick={handleRegisterClick}
        onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register
        onLoginClick={handleLoginClick}
        onReturnClick={handleReturnClick}/>}

        {view === 'login' && <Login 
        onLoginHomepageClick={handleLoginHomepageClick}
        onReturnClick={handleReturnClick}/>}

        {view === 'homepage' && <Homepage
        onCreatePostClick={handleCreatePostClick}
        onReturnClick={handleReturnClick}/>}

    </>
}