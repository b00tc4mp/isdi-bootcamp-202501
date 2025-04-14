export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Landing -> render')

    return <div>
        <a onClick={handleRegisterClick}>Register</a> or <a onClick={handleLoginClick}>Login</a>
    </div>
}