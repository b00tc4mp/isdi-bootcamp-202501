
function Landing({onNavigateToRegister, onNavigateToLogin}) {

    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    return <div className="landing-container">
        
        <div className="logo-container">
            <img src="doc\images\logo-bee-you.png" alt="Bee logo" className="bee-logo-landing" />
        </div>
        <div className="landing-buttons">
            <button onClick={handleRegisterClick}>Register</button>
            <span style={{ margin: "0 5px" }}>or</span>
            <button onClick={handleLoginClick}>Login</button>
        </div>

    </div>
}

export default Landing