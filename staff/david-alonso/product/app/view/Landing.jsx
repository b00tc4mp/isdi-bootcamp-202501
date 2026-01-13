export function Landing({ onNavigateToRegister, onNavigateToLogin }) {

    // const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Landing -> render')

    return <div className="landing">
        <img src="./view/images/Logo X.jpg" className="logo" />
        <div className="start">
            <div>
                <a onClick={handleLoginClick} className="enter" ><span>Enter</span></a>
            </div>
        </div>
    </div>
}