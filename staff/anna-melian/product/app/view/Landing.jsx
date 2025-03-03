function Landing({ onRegisterClick, onLoginClick }) {
    console.debug('Landing -> render')

    return <div>
        <h1 className="logo"></h1>
        <p className="landing">
            <a onClick={onRegisterClick}>Register</a> or <a onClick={onLoginClick}>Login</a>
        </p>

    </div>
}