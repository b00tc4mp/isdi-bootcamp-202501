import { SystemError, ValidationError } from 'com/errors'
import { logic } from '../logic'

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
                .then(()=> {
                    form.reset()

                    onUserLoggedIn()
                })
                .catch(error => {
                    console.error(error)
                    
                    if(error instanceof SystemError)
                        alert('⛔️' + error.message)
                    else
                        alert('⚠️' + error.message)
                })
        } catch (error) {
            console.error(error)

            if(error instanceof ValidationError)
                alert('❗️' + error.message)
            else
                alert('⛔️' + error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

    return <div>
        <h1>myLookAI</h1>

        <div className='flex flex-col'>
            <form onSubmit={handleLoginSubmit}>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="username" />
                </div>
                
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" placeholder="password" />
                </div>

                <button type="submit" className="btn-primary">Login</button>
            </form>

            <a onClick={handleRegisterClick} className="btn-link">Register</a>
        </div>
    </div>
}