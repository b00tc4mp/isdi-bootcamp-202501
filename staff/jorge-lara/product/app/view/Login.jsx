function Login() {

    const handleClickRegister = () => {
        root.render(<Register />)
    }

    return <div>
        <h1>Login</h1>
        <form style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <span><a style={{ cursor: "pointer" }} onClick={handleClickRegister}>Register</a>
                <button type="submit" style={{ marginLeft: "50px" }}>Login</button>
            </span>
        </form>
    </div>
}