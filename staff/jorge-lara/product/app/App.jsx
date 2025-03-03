const { useState } = React

function App() {
    const [view, setView] = useState('landing');

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