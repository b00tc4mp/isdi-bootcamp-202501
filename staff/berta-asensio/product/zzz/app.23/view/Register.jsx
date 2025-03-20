import { logic } from '../logic/index'

import { SystemError, ValidationError } from '../errors'

export function Register({onReturnClick, onUserRegistered}) {
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { 
                name: { value: name },
                username: { value: username },
                password: { value: password },
                email: { value: email }
            } = form

            logic.registerUser(name, username, password, email)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => {
                    console.error(error)
                    //si el error que viene de la parte sincrona es un sistem error
                    if(error instanceof SystemError) 
                        alert('ERROR GRAVE: ' + error.message)
                    //si no mostramos alerta normal
                    else
                        alert('Warning ⚠' + error.message)
                })
        } catch (error) {
            console.error(error)

            if(error instanceof ValidationError)
                alert('❕' + error.message)
            else
            alert('Warning ⚠' + error.message)
        }
    }

    return <div>
        <div className="register-login-header">   
            <img src="doc\images\logo-bee-you.png" alt="Bee logo" className="bee-logo-register-login" />
            <h2>...the new app to meet honey people!🍯</h2>
        </div>

        <p className="paragraph">Create account</p>
        

        <form onSubmit={handleRegisterSubmit}>
            <div className="field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name"
                placeholder="Your name" />
            </div>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username"
                placeholder="Introduce a username" />
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                placeholder="Introduce a password" />
            </div>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email"
                placeholder="Your email" />
            </div>

            <button type="submit">Register</button>
        </form>
        
        <a onClick={onReturnClick}>Return</a>
    </div>
}
