function Login({ onRegisterClick, onLoginSubmit }) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            logic.loginUser(username, password)

            form.reset()

            onLoginSubmit()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Login -> render')

    return <>
        <h1 className="logo"></h1>

        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" />

                <button type="submit">Login</button>
            </form>

            <a onClick={onRegisterClick}>Register</a>
        </div>


    </>
}