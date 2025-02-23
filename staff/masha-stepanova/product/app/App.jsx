const { useState } = React

function App() {
    const [view, setView] = useState('landing')

    const handleRegisterClick = () => setView('register')

    const handleLoginClick = () => setView('login')

    const handleRegisterSubmit = () => setView('login')

    const handleLoginSubmit = () => setView('home')

    const handleLogoutClick = () => setView('login')

    const handleAddPostClick = () => setView('addPost')

    const handleCancelClick = () => setView('home')

    const handleAddPostSubmit = () => setView('home')

    return <>
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />}

        {view === 'register' && <Register onRegisterSubmit={handleRegisterSubmit} onLoginClick={handleLoginClick} />}

        {view === 'login' && <Login onLoginSubmit={handleLoginSubmit} onRegisterClick={handleRegisterClick} />}

        {view === 'home' && <Home onLogoutClick={handleLogoutClick} onAddPostClick={handleAddPostClick} onCancelClick={handleCancelClick} onAddPostSubmit={handleAddPostSubmit} />}

        {/* {view === 'addPost' && <AddPost onCancelClick={handleCancelClick} onAddPostSubmit={handleAddPostSubmit} />} */}
    </>
}