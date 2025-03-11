import { logic } from '../logic/index.js'

export function Register({ onNavigateToLogin, onUserRegistered }) {
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
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

    console.debug('Register -> render')

    return <div>
        <h1>Register</h1>

        <form onSubmit={handleRegisterSubmit}>
            <div className="field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="name"/>
            </div>

            <div className="field">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="e-mail"/>
            </div>

            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="username"/>
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="password"/>
            </div>

            <button type="submit">Register</button>
        </form>

        <a onClick={handleLoginClick}>Login</a>
    </div>
}