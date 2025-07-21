function Register({/*onLoginClick, */onReturnClick, onRegisterSubmit}) {
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

            form.reset()

            onRegisterSubmit()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }



    return <div>
        <h1>Bee you</h1>

        <h2>Create account</h2>
        
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