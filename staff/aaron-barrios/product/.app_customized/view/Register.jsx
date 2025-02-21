function Register({ onLoginClick, onRegisterSubmit }) {
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
            } = form

            logic.registerUser(name, email, username, password)

            form.reset()

            onRegisterSubmit()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
    return <div style={{ width: "400px" }}>
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            gap: "5px"
        }}>

            <label htmlFor="name">Name</label>
            <input type="text" id="name" style={{ width: "350px" }} />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" style={{ width: "350px" }} />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: "350px" }} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" style={{ width: "350px" }} />

            <span style={{
                margin: "10px 55px 10px 10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                <a onClick={onLoginClick} style={{ textDecoration: " underline", cursor: "pointer" }}>Login</a>
                <button type="submit" style={{ width: "80px" }}>Register</button>
            </span>
        </form>
    </div >
}