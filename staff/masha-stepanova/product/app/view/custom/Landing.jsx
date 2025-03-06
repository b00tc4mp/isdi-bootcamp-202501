function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    return <div class="landing-page" >

        <h1>Logo</h1>

        <section class="register-login">
            <a onClick={onNavigateToRegister}>Register</a>
            <> or </>
            <a onClick={onNavigateToLogin}>Login</a>
        </section>

    </div>
}

export default Landing