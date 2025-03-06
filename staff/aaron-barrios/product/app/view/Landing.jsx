function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    return <div>
        <h1>Logo</h1>
        <span style={{ display: "flex", justifyContent: "left", gap: "5px" }}>
            <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={handleRegisterClick}>Register</a> or
            <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={handleLoginClick}>Login</a>
        </span>
    </div>
}

export default Landing
