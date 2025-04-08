export function Landing ({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => {
        onNavigateToRegister()
    }

    const handleLoginClick = () => {
        onNavigateToLogin()
    }

    console.debug('Landing -> render')

    return <div className="text-first-color">
        <h1 className="text-center py-3">Logo</h1>
        <div className="flex flex-col items-center gap-1">
            <a onClick={handleRegisterClick} className="inline-block px-4 py-1 no-underline rounded no-underline border border-first-color text-center bg-second-color">Register</a>
            <a onClick={handleLoginClick} className="inline-block px-4 py-1 no-underline rounded border border-first-color text-center"> Login</a>
        </div>
    </div>
}
