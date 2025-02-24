function Register({onLoginClick, onReturnClick}) {
    return <div>
        <h1>Bee you</h1>
        <h2>Create account</h2>
        <form>
            <label htmlFor="name">Name</label>
            <br />
            <input type="text" id="name" />
            <br />

            <label htmlFor="username">Username</label>
            <br />
            <input type="text" id="username" />
            <br />

            <label htmlFor="password">Password</label>
            <br />
            <input type="password" id="password" />
            <br />

            <label htmlFor="email">Email</label>
            <br />
            <input type="email" id="email" />
            <br />

            <button type="submit" onClick={onLoginClick}>Register</button>
        </form>
        
        <a onClick={onReturnClick}>Return</a>
    </div>
}