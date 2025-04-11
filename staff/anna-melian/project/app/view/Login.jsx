export function Login({ onNavigateToRegister }) {


    const handleRegisterClick = () => onNavigateToRegister()

    console.debug('Login -> render')

    return <div>
        <h1>Login</h1>
        <form >
            <label htmlFor="Username">Username</label>
            <input type="text" id="Username" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <button type="submit">Login</button>
        </form>
        <a onClick={handleRegisterClick}>I don't have an account, REGISTER</a>

    </div>
}