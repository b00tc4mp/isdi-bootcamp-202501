function Login({ onRegisterClick, onLoginSubmit }) {

    const handleLoginSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;

            const { username: { value: username },
                password: { value: password }
            } = form;

            logic.loginUser(username, password);

            form.reset();

            onLoginSubmit();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return <div>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <span>
                <a style={{ cursor: "pointer" }} onClick={onRegisterClick}>Register</a>
                <button type="submit" style={{ marginLeft: "50px" }}>Login</button>
            </span>
        </form>
    </div>
}