export function Landing ({ onNavigateToRegister, onNavigateToLogin }) {
    console.debug('Landing -> render')
    
    const handleRegisterClick = () => {
        onNavigateToRegister()
    }

    const handleLoginClick = () => {
        onNavigateToLogin()
    }

    return <div>
        <h1>Logo</h1>
        <div className="landingAnchors">
            <a onClick={handleRegisterClick} className="anchorRegister">Register </a>
            <a onClick={handleLoginClick} className="anchorLogin"> Login</a>
        </div>
    </div>
}
