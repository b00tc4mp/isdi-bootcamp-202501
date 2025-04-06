import { logic } from '../logic/index.js'
import { useContext } from '../context.js'

export function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const { alert } = useContext()

    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            logic.loginUser(username, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

    console.debug('Login -> render')

    return <div>
        <img src="https://elpingo.com/wp-content/uploads/2023/02/hombre-arana-logo-negro.png" className="mx-auto w-80 h-80" />


        <form onSubmit={handleLoginSubmit}>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="username" />
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="password" />

            </div>

            <button type="submit">Login</button>

            <a onClick={handleRegisterClick}>Register</a>

        </form>


    </div>
}




