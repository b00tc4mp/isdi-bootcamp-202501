function Register() {
    const handleClickLogin = () => {
        root.render(<Login />)
    }

    const handleRegisterSubmit = event => {
        alert('USER REGISTERED MAN')
    }

    return <div style={{ width: "400px" }}>
        <h1>Register</h1>
        <form style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            gap: "5px"
        }}
            onSubmit={handleRegisterSubmit}>

            <label>Name</label>
            <input type="text" style={{ width: "350px" }} />

            <label>E-mail</label>
            <input type="email" style={{ width: "350px" }} />

            <label>Username</label>
            <input type="text" style={{ width: "350px" }} />

            <label>Password</label>
            <input type="password" style={{ width: "350px" }} />

            <span style={{
                margin: "10px 55px 10px 10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                <a style={{ textDecoration: " underline", cursor: "pointer" }} onClick={handleClickLogin}>Login</a>
                <button type="submit" style={{ width: "80px" }}>Register</button>
            </span>
        </form>
    </div >
}