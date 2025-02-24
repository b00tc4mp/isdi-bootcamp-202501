function Landing({ onLoginClick, onRegisterClick }) {
    return <div>
        <h1>Logo</h1>
        <div id="register-or-login">
            <a onClick={onRegisterClick}>Register</a>
            or 
            <a onClick={onLoginClick}>Login</a>
        </div>
    </div>
}