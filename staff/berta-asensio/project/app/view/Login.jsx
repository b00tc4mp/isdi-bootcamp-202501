import { errors } from 'com'
import { logic } from '../logic/index'

const { SystemError } = errors

export function Login({ onNavigateToRegister, onUserLoggedIn }) {

    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                email: { value: email },
                password: { value: password }
            } = form

            logic.loginUser(email, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
                })
                .catch(error => {
                    console.error(error)
                    if(error instanceof SystemError)
                        alert('DANGER: ' + error.message)
                    else 
                        alert('Warning: ' + error.message)
                }) 
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

    console.debug('Login page renderized')

    return <div>
        <h1>Logo</h1>

        <form onSubmit={handleLoginSubmit}>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input type="text" id="Email" placeholder="Your email" />
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Your password" />
            </div>

            <button type="submit">Login</button>
        </form>

        <a onClick={handleRegisterClick}>Register</a>
    </div>
}