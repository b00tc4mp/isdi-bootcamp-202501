function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    return <div className="landing">
        <h1>Logo</h1>
        <span style={{ marginTop: '1rem' }}>
            <a onClick={handleRegisterClick}>Register</a> or
            <a onClick={handleLoginClick}>Login</a>
        </span>
    </div>
}

export default Landing
