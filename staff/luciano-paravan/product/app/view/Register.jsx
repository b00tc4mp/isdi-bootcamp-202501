import { logic } from '../logic/index.js'
import { errors } from 'com'

const {SystemError, ValidationError} = errors

export function Register ({ onNavigateToLogin, onUserRegistered }) {
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                //surname: { value: surname },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form

            //logic.registerUser(name, surname, email, username, password)

            logic.registerUser(name, email, username, password)
                .then(()=> {
                    form.reset()
        
                    onUserRegistered()
                })
                .catch(error => {
                    console.error(error)

                    if (error instanceof SystemError)
                        alert('⛔️' + error.message)
                    else
                        alert('⚠️' + error.message)
                })
        } catch (error) {
            console.error(error)

            if (error instanceof ValidationError)
                alert('❗️' + error.message)
            else
                alert('⛔️' + error.message)
        }
    }

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Register -> render')

    return <div>
            <h1>Logo</h1>
            <h3>Register</h3>
            
            <form onSubmit={handleRegisterSubmit}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="name"/>
                </div>

                {/*<div className="field">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname"/>                    
                </div>*/}

                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" placeholder="e-mail"/>                    
                </div>
                
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="username"/>
                </div>
                
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="password"/>
                </div>


                <button type="submit" className="block text-color rounded border-none justify-center">Register</button>
            
            </form>
                <a onClick={handleLoginClick} className="block text-center bg-transparent text-color border border-color rounded px-4 py-1 m-4">Login</a>
        </div>
}
