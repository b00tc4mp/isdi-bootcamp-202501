function Login({ onRegisterClick, onLoginSubmit }) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            logic.loginUser(username, password)

            form.reset()

            onLoginSubmit()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}>
        <h1>Logo</h1>

        <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <button type="submit">Login</button>
        </form>
        <a onClick={onRegisterClick}>Register</a>
    </div>
}