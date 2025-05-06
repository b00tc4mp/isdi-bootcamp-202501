function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const handleUserLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                email: { value: email },
                password: { value: password }
            } = form

            logic.loginUser(email, password)

            form.reset()

            onUserLoggedIn()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleNavigateToRegister = () => {
        onNavigateToRegister()
    }

    return <div className="form">

        <h1>Logo</h1>

        <form onSubmit={handleUserLoginSubmit} >

            <label htmlFor="email">Email</label>
            <input type="text" id="email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <button type="submit">Login</button>
        </form>
        <a onClick={handleNavigateToRegister}>Register</a>
    </div>
}
