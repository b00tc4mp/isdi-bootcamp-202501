import { logic } from '../logic'
import { useContext } from '../context'
import { Logo } from './components/Logo'

export function Login({onNavigateToRegister, onUserLoggedIn}) {
    const { alert } = useContext()

    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target
            const {
                username: {value: username},
                password: {value: password}
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

    return <div>
        <Logo />
        <form id="form" onSubmit={handleLoginSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="username"/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="********" />
            <div className="buttons-div">
                <a onClick={handleRegisterClick}>Register</a>
                <button type="submit" form="form">Login</button>
            </div>
        </form>
    </div>
}