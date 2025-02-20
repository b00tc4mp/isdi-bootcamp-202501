function Landing() {
    const handleClickLogin = () => {
        root.render(<Login />)
    }

    const handleClickRegister = () => {
        root.render(<Register />)
    }

    return <div>
        <h1>Logo</h1>
        <span style={{ display: "flex", justifyContent: "left", gap: "5px" }}>
            <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={handleClickRegister}>Register</a> or
            <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={handleClickLogin}>Login</a>
        </span>
    </div>
}
