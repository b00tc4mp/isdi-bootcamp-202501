function Login({ onRegisterClick }) {
    return <div>
        <h1>Logo</h1>
        <form>
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <button type="submit">Login</button>
        </form>

        <a onClick={onRegisterClick}>Register</a>
    </div>
}