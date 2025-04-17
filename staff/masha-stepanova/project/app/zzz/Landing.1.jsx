export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Landing -> render')

    return <>
        <div>
            <h1>Welcome to Code Quest!</h1>

            <p>Let's learn and play</p>

            <form>

            </form>

            <button onClick={handleLoginClick}>Login</button> or <button onClick={handleRegisterClick}>Register</button>
        </div>
    </>
}