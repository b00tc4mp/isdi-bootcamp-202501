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
                .then(() => {
                    form.reset()
        
                    alert('user created')
        
                    onUserRegistered()
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

    const handleLoginClick = () => onNavigateToLogin()

    return <div>
        <Logo />
        <form id="register-form" onSubmit={handleRegisterSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="name"/>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="e-mail"/>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="username"/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="********"/>
            <div className="buttons-div">
                <a onClick={handleLoginClick}>Login</a>
                <button type="submit" form="register-form">Register</button>
            </div>
        </form>
    </div>
}