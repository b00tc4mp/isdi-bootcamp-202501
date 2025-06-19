import { logic } from '../logic/index'
import { errors } from 'com'

const { SystemError, ValidationError } = errors


export function Register ({ onReturnClick, onUserRegistered }) {
    
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try { 
            const { target: form } = event 

            const {
                name: { value: name },
                email: { value: email },
                password: { value: password }
            } = form

            logic.registerUser(name, email, password)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => {
                    console.error(error)
                    if(error instanceof SystemError)
                        alert('DANGER: ' + error.message)
                    else 
                        alert('Warning: ' + error.message)
                })
        } catch (error) {
            console.error(error)

            if(error instanceof ValidationError)
                alert('📢' + error.message)
            else
                alert('Warning: ' + error.message)
        }
    }

    const handleReturnClick = () => onReturnClick()

    console.debug('Register page renderized')

    return <div>
        <div className="RegisterPage">
            <div className="logo">Logo</div>
            <h2>Time to Register!</h2>
            <h3>/or return if you are already registered/</h3>
        </div>

        <form onSubmit={handleRegisterSubmit}>
            <div className="field">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    className="input"
                    placeholder="Your name"
                />
            </div>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    className="input"
                    placeholder="Your email"
                />
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    className="input"
                    placeholder="Your password"
                />
            </div>

            <button type="submit">Register</button>
        </form>

        <a onClick={handleReturnClick}>Return</a>
    </div>
}