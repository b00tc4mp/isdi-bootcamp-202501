function Landing({ onRegisterClick, onLoginClick }) {
    return <div class="landing-page" >
        {/* style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "50px" }}> */}

        <h1>Logo</h1>

        <section class="register-login">
            <a onClick={onRegisterClick}>Register</a>
            <> or </>
            <a onClick={onLoginClick}>Login</a>
        </section>


    </div>
}