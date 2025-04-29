export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Landing -> render')
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="title mb-20">TimeArt</h1>

            <div className="flex flex-col items-center space-y-4">
                <button onClick={handleLoginClick}>Login</button>
                <p>or</p>
                <button onClick={handleRegisterClick}>Register</button>
            </div>
        </div>
    )
}