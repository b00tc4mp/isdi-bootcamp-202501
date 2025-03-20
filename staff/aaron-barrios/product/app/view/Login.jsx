import { logic } from '../logic/index.js'
import {errors} from 'com'

const {SystemError, ValidationError} = errors

export function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password },
            } = form

            logic.loginUser(username, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
                })
                //ERRORES ASÍNCRONOS
                .catch(error => {
                    console.error(error)

                    if(error instanceof SystemError)
                        alert('⛔ ' + error.message)
                    else
                        alert('⚠️ ' + error.message)
                })
            //ERRORES SÍNCRONOS
        } catch (error) {
            console.error(error)

            if(error instanceof ValidationError)
                alert('❌ ' + error.message)
            else
                alert('⛔ ' + error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

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
                <a onClick={handleRegisterClick}>Register</a>
                <button type="submit">Login</button>
            </span>
        </form>
    </div>
}