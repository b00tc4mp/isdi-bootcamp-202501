export function Register({ onNavigateToLogin }) {


    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Register -> render')

    return <div>
        <h1>Register</h1>
        <form >
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            <label htmlFor="Username">Username</label>
            <input type="text" id="Username" />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <button type="submit">Register</button>
        </form>
        <a onClick={handleLoginClick} >I already have an account, LOGIN</a>
    </div>

}