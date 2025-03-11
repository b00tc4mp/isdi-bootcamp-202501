import {logic} from '../logic/index'
import {Logo} from './components/Logo.jsx'

export function Register({onNavigateToLogin, onUserRegistered}) {
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target
            const {
                name: {value: name},
                email: {value: email},
                username: {value: username},
                password: {value: password}
            } = form

            logic.registerUser(name, email, username, password)

            form.reset()

            alert('user created')

            onUserRegistered()
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleLoginClick = () => onNavigateToLogin()

    return <div>
        <Logo />
        <form id="register-form" onSubmit={handleRegisterSubmit}>
            <label htmlFor="register-name">Name</label>
            <input type="text" id="register-name" placeholder="name"/>
            <label htmlFor="register-email">E-mail</label>
            <input type="email" id="register-email" placeholder="e-mail"/>
            <label htmlFor="register-username">Username</label>
            <input type="text" id="register-username" placeholder="username"/>
            <label htmlFor="register-password">Password</label>
            <input type="password" id="register-password" placeholder="********"/>
            <div className="buttons-div">
                <a onClick={handleLoginClick}>Login</a>
                <button type="submit" form="register-form">Register</button>
            </div>
        </form>
    </div>
}