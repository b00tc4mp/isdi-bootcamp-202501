function Login() {
    const handleClickRegister = () => {
        root.render(<Register />)
    }

    const handleLoginSubmit = event => {
        alert('LOGGED IN BRUH')
    }

    return <div style={{ width: "400px" }}>
        <h2>Login</h2>

        <form
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                gap: "5px"
            }}
            onSubmit={handleLoginSubmit}>

            <label>Username</label>
            <input type="text" style={{ width: "350px" }} />

            <label>Password</label>
            <input type="password" style={{ width: "350px" }} />

            <span
                style={{
                    margin: "10px 60px 10px 10px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={handleClickRegister}>Register</a>
                <button type="submit" style={{ width: "80px" }}>Login</button>
            </span>
        </form>
    </div>
}