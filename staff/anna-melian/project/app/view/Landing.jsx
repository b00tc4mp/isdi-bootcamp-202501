export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Landing -> render')
    return <div>
        <h1>TimeArt</h1>
        <button onClick={handleLoginClick}>Login</button>
        <p>or</p>
        <button onClick={handleRegisterClick}>Register</button>

    </div>
}