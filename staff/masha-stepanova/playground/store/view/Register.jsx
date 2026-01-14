// require logic

function Register({ onUserRegistered, onNavigateToLogin }) {

    const handleRegisterSubmit = (event) => {
        event.preventDefault()
        try {
            const { target: form } = event

            const {
                name: { value: name },
                surname: { value: surname },
                email: { value: email },
                password: { value: password }
            } = form

            logic.registerUser(name, surname, email, password)

            onUserRegistered()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleOnLoginClick = () => {
        try {
            onNavigateToLogin()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        <header>
            <h1>Store Logo</h1>
        </header>

        <section>
            <h2>Register</h2>

            <form onSubmit={handleRegisterSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" />

                <label htmlFor="surname">Surname</label>
                <input type="text" id="surname" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" />

                <button type="submit">Register</button>
            </form>

            <a onClick={handleOnLoginClick}>Login</a>
        </section>
    </>
}