import { logic } from '../logic/index.js'
import { errors } from 'com'
import { useContext } from '../context.js'

const { SystemError, ValidationError } = errors

export function Register({ onNavigateToLogin, onUserRegistered }) {
    const { alert } = useContext()

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
        <img src="https://elpingo.com/wp-content/uploads/2023/02/hombre-arana-logo-negro.png" className="mx-auto w-80 h-80 mt-[-20px]" />


        <form onSubmit={handleRegisterSubmit} className="mt-[-30px]">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <button type="submit">Register</button>

            <a onClick={handleLoginClick}>Login</a>

        </form>

    </div>
}

