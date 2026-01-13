import { logic } from '../logic/index'

export function Login({onUserLoggedIn, onReturnClick}) {
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

    return <div>
        <div className="register-login-header">   
            <img src="doc\images\logo-bee-you.png" alt="Bee logo" className="bee-logo-register-login" />
            <h2>...the new app to meet honey people!🍯</h2>
        </div>
        
        <p className="paragraph">Login</p>

        <form onSubmit={handleLoginSubmit}>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username"/>
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>
            </div>

            <button type="submit">Login</button>

        </form>

        <a onClick={onReturnClick}>Return</a>

    </div>
}