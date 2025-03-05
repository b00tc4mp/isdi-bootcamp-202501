import logic from '../logic.js'

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

    return <div className="login">
        <h2>Login</h2>

        <form onSubmit={handleLoginSubmit} style={{ marginTop: '1rem' }}>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Type name..." />
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Type password..." />
            </div>

            <span style={{ justifyContent: "space-between" }}>
                <a onClick={onRegisterClick}>Register</a>
                <button type="submit">Login</button>
            </span>
        </form>
    </div>
}

export default Login