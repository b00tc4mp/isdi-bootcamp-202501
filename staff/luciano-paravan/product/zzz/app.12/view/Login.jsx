import logic from '../logic.js'

function Login ({ onRegisterClick, onLoginSubmit }) {
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

            onLoginSubmit()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Login -> render')

    return <>
        <div>
            <h1>Logo</h1>
            <h3>Login</h3>
            <form onSubmit={handleLoginSubmit}>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"/>
                </div>
                    
                <button type="submit" className="loginSubmitButton">Login</button>
            </form>
            <a onClick={onRegisterClick} className="anchorRegisterOfLogin">Register</a>
        </div>
    </>
}

export default Login