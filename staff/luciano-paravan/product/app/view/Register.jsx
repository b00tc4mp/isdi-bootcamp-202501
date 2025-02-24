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
                <label htmlFor="name">Name</label>
                <input type="text" id="name"/>

                <label htmlFor="surname">Surname</label>
                <input type="text" id="surname"/>

                <label htmlFor="email">E-mail</label>
                <input type="text" id="email"/>

                <label htmlFor="username">Username</label>
                <input type="text" id="username"/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>

                <button type="submit">Register</button>
                
                <a onClick={onLoginClick}>Login</a>
            </form>
        </div>
}