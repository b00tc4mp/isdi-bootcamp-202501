export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Landing -> render')

    return <div>
        <h1 className="logo-hogwarts">Logo</h1>
        <a onClick={handleRegisterClick}>Register</a> or <a onClick={handleLoginClick}>Login</a>
    </div>
}