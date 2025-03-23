import { logic } from '../../logic/index'

export function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const handleUserLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            logic.loginUser(username, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleNavigateToRegister = () => onNavigateToRegister()

    return <div className="form">

        <h1>Foodies</h1>

        <form onSubmit={handleUserLoginSubmit} >

            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <button type="submit">Login</button>
        </form>
        <a onClick={handleNavigateToRegister}>Register</a>
    </div>
}