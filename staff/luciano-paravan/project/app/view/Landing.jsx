export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    return <div className="flex flex-col items-center gap-4 p-6 rounded-md shadow-md">
        <h1>myLookAI</h1>
        <a onClick={handleRegisterClick} className="inline-block px-6 py-3 text-white rounded-md shadow-sm">Register</a>
        <a onClick={handleLoginClick} className="inline-block px-6 py-3 text-white rounded-md shadow-sm">Login</a>
    </div>
}