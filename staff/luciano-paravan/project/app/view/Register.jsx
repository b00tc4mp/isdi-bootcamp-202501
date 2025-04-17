import { logic } from '../logic'
import { errors } from 'com'

const { SystemError, ValidationError } = errors

export function Register({onNavigateToLogin, onUserRegistered}) {

    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event
    
            const {
                name: { value: name },
                lastname: { value: lastname },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form
    
            logic.registerUser(name, lastname, email, username, password)
                .then(()=> {
                    form.reset()
    
                    onUserRegistered()
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

    const handleLoginClick = () => onNavigateToLogin()

    return <div>
        <h1>myLookAI</h1>
        
        <div className='flex flex-col'>
            <form onSubmit={handleRegisterSubmit}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="name" />
                </div>
                
                <div className="field">
                    <label htmlFor="lastname">lastname</label>
                    <input type="text" id="lastname" placeholder="lastname" />
                </div>
                
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="email" />
                </div>
                
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="username" />
                </div>
                
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" placeholder="password" />
                </div>

                <button type="submit" className='btn-primary'>Register</button>
            </form>

            <a onClick={handleLoginClick} className="btn-link">Login</a>

        </div>
    </div>
}