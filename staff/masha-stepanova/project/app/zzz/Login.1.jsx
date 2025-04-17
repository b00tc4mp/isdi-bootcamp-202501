import { useContext } from '../context'
import { logic } from '../logic'

export function Login({ onUserLoggedIn, onNavigateToRegister }) {
    const { alert } = useContext()

    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            console.log(username, password)

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

    const handleRegisterClick = () => {
        onNavigateToRegister()
    }

    console.debug('Login -> render')

    return <>
        <div>
            <h1>Code Quest</h1>

            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />

                <label htmlFor="password">Password</label>
                <input type="text" id="password" />

                <button type="submit">Log in</button>
            </form>

            <a onClick={handleRegisterClick}>Register</a>
        </div>
    </>
}