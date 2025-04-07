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

    return <div>
        <h1>Login</h1>

        <form onSubmit={handleLoginSubmit}>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username'
            placeholder="Username please"/>

            <label htmlFor='password'>Password</label>
            <input type='password' id='password'
            placeholder="Password please"/>

            <button type='submit'>Login</button>
        </form>
        <a onClick={onRegisterClick}>Register</a>
    </div>
}