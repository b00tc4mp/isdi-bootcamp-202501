import { logic } from '../logic'
import { useContext } from '../context'

export function Login({onUserLoggedIn, onReturnClick}) {
    const { alert } = useContext()

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
    
    const handleReturnClick = () => onReturnClick()

    console.debug('Login -> render')

    return <div>
        <div className="register-login-header">   
            <img src="doc\images\logo-bee-you.png" alt="Bee logo" className="bee-logo-register-login" />
            <h2>...the new app to meet honey people!🍯</h2>
        </div>
        
        <p className="paragraph">Login</p>

        <form onSubmit={handleLoginSubmit}>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username"
                    className="input"
                    placeholder="Introduce your username"
                />
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    className="input"
                    placeholder="Introduce your password"
                />
            </div>

            <button type="submit">Login</button>

        </form>

        <a onClick={handleReturnClick}>Return</a>

    </div>
}