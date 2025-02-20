function Register({ onLoginClick, onRegisterSubmit }) {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}>
        <h1>Logo</h1>
        <form onClick={onRegisterSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label>Name</label>
            <input />
            <label>E-mail</label>
            <input type="email" />
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <button type="submit">Submit</button>
        </form>
        <a onClick={onLoginClick}>Login</a>
    </div>
}