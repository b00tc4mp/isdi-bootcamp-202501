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
            <label htmlFor="name">Name</label>
            <br />
            <input type="text" id="name" />
            <br />

            <label htmlFor="username">Username</label>
            <br />
            <input type="text" id="username" />
            <br />

            <label htmlFor="password">Password</label>
            <br />
            <input type="password" id="password" />
            <br />

            <label htmlFor="email">Email</label>
            <br />
            <input type="email" id="email" />
            <br />

            <button type="submit">Register</button>
        </form>
        
        <a onClick={onReturnClick}>Return</a>
    </div>
}