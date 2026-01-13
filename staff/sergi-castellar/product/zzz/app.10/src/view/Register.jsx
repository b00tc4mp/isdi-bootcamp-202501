import logic from '../logic.js'
import Logo from './Logo.jsx'

function Register({onLoginClick, onRegisterSubmit}) {
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target
            const name = form[0].value
            const email = form[1].value
            const username = form[2].value
            const password = form[3].value

            logic.registerUser(name, email, username, password)

            form.reset()

            alert('user created')

            onRegisterSubmit()
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

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
                <a onClick={onLoginClick}>Login</a>
                <button type="submit" form="register-form">Register</button>
            </div>
        </form>
    </div>
}

export default Register