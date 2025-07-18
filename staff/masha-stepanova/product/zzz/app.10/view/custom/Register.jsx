import logic from '../../logic.js'

function Register({ onNavigateToLogin, onUserRegistered }) {

    const handleUserRegistered = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form

            logic.registerUser(name, email, username, password)

            onUserRegistered()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    return <div class="form">
        {/* style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}> */}
        <h1>Logo</h1>
        <form onSubmit={handleUserRegistered} >
            {/* style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}> */}
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <button type="submit">Submit</button>
        </form>
        <a onClick={onNavigateToLogin}>Login</a>
    </div>
}

export default Register