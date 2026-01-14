function Login ({ onRegisterClick}) {
    return <>
        <div>
            <h1>Logo</h1>
            <h3>Login</h3>
            <form>
                <label></label>
                <input type="text" />
                <label></label>
                <input type="password" />
                <button type="submit">Login</button>
            </form>
            <a onClick={onRegisterClick}>Register</a>
        </div>
    </>
}