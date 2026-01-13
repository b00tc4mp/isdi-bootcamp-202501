import logic from '../logic.js'

import Logo from './Logo.jsx'

function Login({onRegisterClick, onLoginSubmit}) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target
            const username = form[0].value
            const password = form[1].value
                
            logic.loginUser(username, password)

            form.reset()

            alert(`Welcome again, ${username}`)

            onLoginSubmit()
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    return <div>
        <Logo />
        <form id="login-form" onSubmit={handleLoginSubmit}>
            <label htmlFor="login-username">Username</label>
            <input type="text" id="login-username" placeholder="username"/>
            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" placeholder="********" />
            <div className="buttons-div">
                <a onClick={onRegisterClick}>Register</a>
                <button type="submit" form="login-form">Login</button>
            </div>
        </form>
    </div>
}

export default Login