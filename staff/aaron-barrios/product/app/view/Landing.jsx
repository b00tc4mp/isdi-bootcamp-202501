function Landing({ onRegisterClick, onLoginClick }) {
    return <div>
        <h1>Logo</h1>
        <span style={{ display: "flex", justifyContent: "left", gap: "5px" }}>
            <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={onRegisterClick}>Register</a> or
            <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={onLoginClick}>Login</a>
        </span>
    </div>
}
