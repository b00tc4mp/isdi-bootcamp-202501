import { logic } from '../logic/index.js'

export function Login ({ onNavigateToRegister, onUserLoggedIn }) {
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
            <a onClick={handleRegisterClick} className="anchorRegisterOfLogin">Register</a>
        </div>
    </>
}
