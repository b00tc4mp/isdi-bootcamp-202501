function Login({onLoginHomepageClick, onReturnClick}) {
    return <div>
        <h1>Bee You</h1>
        <h2>Login</h2>
        <form>
            <label>Username</label>
            <br />
            <input />
            <br />
            <label>Password</label>
            <br />
            <input type="password" />
            <br />
            <button type="submit" onClick={onLoginHomepageClick}>Login</button>
        </form>
        <a onClick={onReturnClick}>Return</a>
        </div>
}