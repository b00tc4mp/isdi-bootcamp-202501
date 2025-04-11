
export function Landing({onNavigateToRegister, onNavigateToLogin}) {

    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Landing page renderized')

    return <div className="Landing">
        <div className="logo">Logo</div>
        <div className="buttons">
            <h1>Welcome to Little Breakfast!</h1>
            <button onClick={handleRegisterClick}>Register</button>
            <span>or</span>
            <button onClick={handleLoginClick}>Login</button>
        </div>

    </div>
}