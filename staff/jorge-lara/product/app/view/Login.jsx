import logic from '../logic.js'

function Login({ onNavigateToRegister, onUserLoggedIn }) {

    const handleLoginSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;

            const { username: { value: username },
                password: { value: password }
            } = form;

            logic.loginUser(username, password);

            form.reset();

            onUserLoggedIn();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
            <div className="field">
                <input type="text" id="username" placeholder="Username" />
            </div>
            <div className="field">
                <input type="password" id="password" placeholder="Password" />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
        <div className="bottom-form">
            <span>
                Don't have an account?
                <a onClick={onNavigateToRegister}>Sign Up</a>
            </span>
        </div>
    </div>
}

export default Login;