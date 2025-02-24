function Login({onLoginSubmit, onReturnClick}) {
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

    return <div>
        <h1>Bee You</h1>

        <h2>Login</h2>

        <form onSubmit={handleLoginSubmit}>

            <label htmlFor="username">Username</label>
            <br />
            <input type="text" id="username"/>
            <br />

            <label htmlFor="password">Password</label>
            <br />
            <input type="password" id="password"/>
            <br />

            <button type="submit">Login</button>

        </form>

        <a onClick={onReturnClick}>Return</a>

    </div>
}