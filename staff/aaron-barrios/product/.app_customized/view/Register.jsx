import logic from '../logic.js'

function Register({ onNavigateToLogin, onUserRegistered }) {
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

            onUserRegistered()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLoginClick = () => onNavigateToLogin()

    return <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit} style={{ marginTop: '1rem' }}>
            <div className="field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Type name..." />
            </div>

            <div className="field">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="Type email..." />
            </div>

            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Type username..." />
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Type password..." />
            </div>

            <span style={{ justifyContent: "space-between" }}>
                <a onClick={handleLoginClick}>Login</a>
                <button type="submit">Register</button>
            </span>
        </form>
    </div >
}

export default Register