export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister();

    const handleLoginClick = () => onNavigateToLogin();

    return <div className="flex flex-col items-center justify-center text-center min-h-screen w-full px-4 space-y-8">
        <h1 className="text-white text-3xl">Fitrack</h1>
        <img src="assets/logo.svg" className="w-32 h-32 md:w-40 md:h-40"></img>

        <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg p-6 flex flex-col space-y-4">
            <a className="cursor-pointer text-xl font-semibold" onClick={handleRegisterClick}>Register</a>
            <a className="cursor-pointer text-xl font-semibold" onClick={handleLoginClick}>Login</a>
        </div>
    </div>
}