export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleRegisterLogin = () => onNavigateToLogin()

    console.debug('Landing -> render')

    return <div className="landing-page" >

        <h1>Foodies</h1>

        <section className="register-login">
            <a onClick={handleRegisterClick}>Register</a>
            <> or </>
            <a onClick={handleRegisterLogin}>Login</a>
        </section>

    </div>
}