export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    return <div className="landing-page" >

        <h1>Logo</h1>

        <section className="register-login">
            <a onClick={onNavigateToRegister}>Register</a>
            <> or </>
            <a onClick={onNavigateToLogin}>Login</a>
        </section>

    </div>
}