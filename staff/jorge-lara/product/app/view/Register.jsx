function Register({ onLoginClick, onRegisterSubmit }) {
    const handleRegisterSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form;

            logic.registerUser(name, email, username, password);

            form.reset();

            onRegisterSubmit();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit}>
            <div className="field">
                <input type="text" id="name" placeholder="Name" />
            </div>

            <div className="field">
                <input type="email" id="email" placeholder="Email address" />
            </div>

            <div className="field">
                <input type="text" id="username" placeholder="Username" />
            </div>

            <div className="field">
                <input type="password" id="password" placeholder="Password" />
            </div>

            <div>
                <button type="submit">Register</button>
            </div>
        </form>
        <div className="bottom-form">
            <span>
                Already have an account?
                <a onClick={onLoginClick}>Login</a>
            </span>
        </div>

    </div>
}