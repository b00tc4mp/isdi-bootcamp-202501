function Register({onLoginClick, onRegisterSubmit}) {
    const handleRegisterSubmit = event =>{
        event.preventDefault();

        try {
            const {target : form } = event;

            const {
                name: {value: name},
                email: { value: email},
                username: {value: username},
                password: {value: password}
            } = form;

            logic.registerUser(name,email,username,password);

            form.reset();

            onRegisterSubmit();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return <div>
        <h1>Register</h1>
        <form style={{ display: 'flex', flexDirection: 'column', width: '250px' }} onSubmit={handleRegisterSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name"/>

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email"/>

            <label htmlFor="username">Username</label>
            <input type="text" id="username"/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password"/>
            <span>
                <a style={{ cursor: "pointer" }} onClick={onLoginClick}>Login</a>
                <button type="submit" style={{ marginLeft: "50px" }}>Register</button>
            </span>
        </form>
    </div>
}