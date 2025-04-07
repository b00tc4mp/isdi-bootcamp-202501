import logic from '../logic.js'

function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            logic.loginUser(username, password)

            form.reset()

            onUserLoggedIn()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

    console.debug('Login -> render')

    return <div>
        <h1>Login</h1>

        <form onSubmit={handleLoginSubmit}>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username'
            placeholder="username"/>

            <label htmlFor='password'>Password</label>
            <input type='password' id='password'
            placeholder="password"/>

            <button type='submit'>Login</button>
        </form>
        <a onClick={handleRegisterClick}>Register</a>
    </div>
}

export default Login