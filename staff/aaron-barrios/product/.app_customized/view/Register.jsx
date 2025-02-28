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
    return <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit} style={{ marginTop: '1rem' }}>
            <div className="field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" />
            </div>

            <div className="field">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" />
            </div>

            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
            </div>

            <span style={{ justifyContent: "space-between" }}>
                <a onClick={onLoginClick}>Login</a>
                <button type="submit">Register</button>
            </span>
        </form>
    </div >
}