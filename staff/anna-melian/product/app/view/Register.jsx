import { logic } from '../logic/index.js'
import { errors } from 'com'

const { SystemError, ValidationError } = errors

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
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => {
                    console.error(error)

                    if (error instanceof SystemError)
                        alert('⛔️ ' + error.message)
                    else
                        alert('⚠️ ' + error.message)
                })
        } catch (error) {
            console.error(error)

            if (error instanceof ValidationError)
                alert('❗️ ' + error.message)
            else
                alert('⛔️ ' + error.message)
        }
    }

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Register -> render')

    return <div>
        <h1 className="logo-hogwarts"></h1>

        <div className='register'>
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
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

                <button type="submit">Register</button>
            </form>

            <a onClick={handleLoginClick}>Login</a>
        </div>

    </div>
}