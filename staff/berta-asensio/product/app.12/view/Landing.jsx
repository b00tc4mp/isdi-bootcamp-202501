function Landing({onRegisterClick, onLoginClick}) {
    return <div className="landing-container">
        <div className="logo-container">
        <img src="images/images.png" alt="Bee logo" className="bee-logo" />
        <h1>Bee you</h1>
        </div>
        <div className="landing-buttons">
            <button onClick={onRegisterClick}>Register</button>
            <span style={{ margin: "0 5px" }}>or</span>
            <button onClick={onLoginClick}>Login</button>
        </div>

    </div>
}