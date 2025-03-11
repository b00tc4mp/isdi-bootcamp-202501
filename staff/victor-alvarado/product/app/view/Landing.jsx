export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()


    console.debug('landing -> render')

    return <div>
        <img src="https://elpingo.com/wp-content/uploads/2023/02/hombre-arana-logo-negro.png" className="logo2" />


        <div className="div1">
            <a onClick={handleRegisterClick}>Register </a>
            &nbsp;
            or
            &nbsp;
            <a onClick={handleLoginClick}>Login</a>

        </div>

    </div>
}
