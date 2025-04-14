import { logic } from '../logic'

export function Register({onNavigateToLogin, onUserRegistered}) {
    
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target
            const {
                name: {value: name},
                email: {value: email},
                username: {value: username},
                password: {value: password},
                password2: {value: password2}
            } = form

            logic.registerUser(name, email, username, password, password2)
                .then(() => {
                    form.reset()
        
                    alert('user created')
        
                    onUserRegistered()
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

    const handleLoginClick = () => onNavigateToLogin()

    return <>
    <h1>Logo</h1>
    <div>
        <form id="register-form" onSubmit={handleRegisterSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="name"/>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="username"/>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="e-mail"/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="********"/>
            <label htmlFor="password2">Confirm password</label>
            <input type="password" id="password2" placeholder="********"/>
            <div className="buttons-div">
                <a onClick={handleLoginClick}>I already have an account</a>
                <button type="submit" form="register-form">Register</button>
            </div>
        </form>
    </div>
    </>
}