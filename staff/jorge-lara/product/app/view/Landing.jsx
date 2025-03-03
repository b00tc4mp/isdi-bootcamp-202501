function Landing({ onRegisterClick, onLoginClick }) {

    return <div className="landing">
        <h1>Logo</h1>
        <a onClick={onRegisterClick}>Register</a>
        <a onClick={onLoginClick}>Login</a>
    </div>
}

