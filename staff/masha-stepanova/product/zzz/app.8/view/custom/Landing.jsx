function Landing({ onRegisterClick, onLoginClick }) {
    return <div class="landing-page" >

        <h1>Logo</h1>

        <section class="register-login">
            <a onClick={onRegisterClick}>Register</a>
            <> or </>
            <a onClick={onLoginClick}>Login</a>
        </section>

    </div>
}

export default Landing