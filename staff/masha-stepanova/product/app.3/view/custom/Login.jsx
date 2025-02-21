function Login({ onRegisterClick, onLoginSubmit }) {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}>
        <h1>Logo</h1>
        <form onClick={onLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label>Username</label>
            <input />
            <label>Password</label>
            <input type="password" />
            <button type="submit">Login</button>
        </form>
        <a onClick={onRegisterClick}>Register</a>
    </div>
}