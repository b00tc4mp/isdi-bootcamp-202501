function Login({ onRegisterClick, onLoginSubmit }) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password },
            } = form

            logic.loginUser(username, password)

            form.reset()

            onLoginSubmit()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <div style={{ width: "400px" }}>
        <h2>Login</h2>

        <form onSubmit={handleLoginSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                gap: "5px"
            }}>

            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: "350px" }} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" style={{ width: "350px" }} />

            <span
                style={{
                    margin: "10px 60px 10px 10px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                <a onClick={onRegisterClick} style={{ textDecoration: "underline", cursor: "pointer" }}>Register</a>
                <button type="submit" style={{ width: "80px" }}>Login</button>
            </span>
        </form>
    </div>
}