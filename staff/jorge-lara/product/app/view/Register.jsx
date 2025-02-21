function Register() {

    const handleClickLogin = () => {
        root.render(<Login />)
    }

    return <div>
        <h1>Register</h1>
        <form style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
            <label>Name</label>
            <input type="text" />
            <label>Email</label>
            <input type="email" />
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <span>
                <a style={{ cursor: "pointer" }} onClick={handleClickLogin}>Login</a>
                <button type="submit" style={{ marginLeft: "50px" }}>Register</button>
            </span>
        </form>
    </div>
}