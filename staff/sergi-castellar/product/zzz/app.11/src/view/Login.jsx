import logic from '../logic.js'

import Logo from './components/Logo.jsx'

function Login({onNavigateToRegister, onUserLoggedIn}) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target
            const {
                username: {value: username},
                password: {value: password}
            } = form
                
            logic.loginUser(username, password)

            form.reset()

            alert(`Welcome again, ${username}`)

            onUserLoggedIn()
        } catch (error) {
            logic.helper.handleError(error)
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

export default Login