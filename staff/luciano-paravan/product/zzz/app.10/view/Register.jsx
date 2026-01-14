function Register ({ onLoginClick, onRegisterSubmit }) {
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                surname: { value: surname },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form

            logic.registerUser(name, surname, email, username, password)

            form.reset()

            onRegisterSubmit()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Register -> render')

    return <div>
            <h1>Logo</h1>
            <h3>Register</h3>
            <form onSubmit={handleRegisterSubmit}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name"/>
                </div>

                <div className="field">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname"/>                    
                </div>

                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email"/>                    
                </div>
                
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username"/>
                </div>
                
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"/>
                </div>


                <button type="submit" className="registerSubmitButton">Register</button>
                
                <a onClick={onLoginClick} className="anchorLoginOfRegister">Login</a>
            </form>
        </div>
}