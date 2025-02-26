function Landing({onRegisterClick, onLoginClick}) {
    return <div>
        <h1>Bee you</h1>
        <button onClick={onRegisterClick}>Register</button>
         or 
        <button onClick={onLoginClick}>Login</button>
        </div>
}