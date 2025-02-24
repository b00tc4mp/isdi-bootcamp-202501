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

    return <div style={{display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "gray"}}>
        <h1>Login</h1>
        <form style={{ display: "flex", flexDirection: "column", gap:"15px"
  }}
        onSubmit={handleLoginSubmit}>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username'/>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password'/>
            <button type='submit'>Login</button>
        </form>
        <a onClick={onRegisterClick}>Register</a>
    </div>
}