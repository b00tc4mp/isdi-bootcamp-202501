function Landing({ onNavigateToRegister, onNavigateToLogin }) {

    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Landing -> render')

    return <div className="landing">
        <img src="./view/images/Logo.jpg" className="logo" />
        <div className="anchor">
            <div >
                <a onClick={handleRegisterClick} >REGISTER</a>
            </div>
            <div >
                <a onClick={handleLoginClick} >LOGIN</a>
            </div>
        </div>
    </div>
}

export default Landing