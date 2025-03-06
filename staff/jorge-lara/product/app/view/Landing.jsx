function Landing({ onNavigateToRegister, onNavigateToLogin }) {

    return <div className="landing">
        <h1>Logo</h1>
        <a onClick={onNavigateToRegister}>Register</a>
        <a onClick={onNavigateToLogin}>Login</a>
    </div>
}

export default Landing;