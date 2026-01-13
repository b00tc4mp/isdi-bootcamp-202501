function Landing({ onRegisterClick, onLoginClick }) {
    console.debug('Landing -> render')

    return <div className="landing">
        <img src="./view/images/Logo.jpg" className="logo" />
        <div className="anchor">
            <div >
                <a onClick={onRegisterClick} >REGISTER</a>
            </div>
            <div >
                <a onClick={onLoginClick} >LOGIN</a>
            </div>
        </div>
    </div>
}