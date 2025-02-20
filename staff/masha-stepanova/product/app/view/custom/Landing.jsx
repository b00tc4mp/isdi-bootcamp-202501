function Landing({ onRegisterClick, onLoginClick }) {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "50px" }}>
        <h1 style={{ justifyContent: "center" }}>Logo</h1>
        <span>
            <a onClick={onRegisterClick}>Register</a>
            <> or </>
            <a onClick={onLoginClick}>Login</a>
        </span>
    </div>
}