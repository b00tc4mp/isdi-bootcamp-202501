export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('landing -> render')

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* Logo */}
            <img
                src="https://elpingo.com/wp-content/uploads/2023/02/hombre-arana-logo-negro.png"
                alt="Logo"
                className="w-100 h-100 mx-auto mb-8"
            />

            {/* Enlaces de navegación */}
            <div className="div1 text-center">
                <a
                    onClick={handleRegisterClick}
                    className="text-white text-3xl font-semibold cursor-pointer hover:text-yellow-500 hover:underline transition-all duration-300"
                >
                    Register
                </a>
                &nbsp;or&nbsp;
                <a
                    onClick={handleLoginClick}
                    className="text-white text-3xl font-semibold cursor-pointer hover:text-yellow-500 hover:underline transition-all duration-300"
                >
                    Login
                </a>
            </div>
        </div>
    )
}