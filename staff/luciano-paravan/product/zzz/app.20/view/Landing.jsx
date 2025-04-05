export function Landing ({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => {
        onNavigateToRegister()
    }

    const handleLoginClick = () => {
        onNavigateToLogin()
    }

    console.debug('Landing -> render')

    return <div>
        <h1>Logo</h1>
        <div className="landingAnchors">
            <a onClick={handleRegisterClick} className="anchorRegister">Register </a>
            <a onClick={handleLoginClick} className="anchorLogin"> Login</a>
        </div>
    </div>
}
