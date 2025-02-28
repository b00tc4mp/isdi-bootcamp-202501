function Landing({ onRegisterClick, onLoginClick }) {
    return <div className="landing">
        <h1>Logo</h1>
        <span style={{ marginTop: '1rem' }}>
            <a onClick={onRegisterClick}>Register</a> or
            <a onClick={onLoginClick}>Login</a>
        </span>
    </div>
}
