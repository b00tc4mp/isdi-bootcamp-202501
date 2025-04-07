function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()
    
    console.debug('Landing -> render')

    return <div className="landing">
        <h1>Deepstagram</h1>
        <h4>¡Meet people, share contents, rate posts and more!</h4>
        <a onClick={handleRegisterClick}>Register</a> or <a onClick={handleLoginClick}>Login</a>
    </div>
}

export default Landing