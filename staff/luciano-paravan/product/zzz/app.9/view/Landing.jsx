function Landing ({ onRegisterClick, onLoginClick }) {
    //const { onRegisterClick } = props desestructuro directamente en lo que paso como parametro

    return <div>
        <h1>Logo</h1>
        <a onClick={onRegisterClick}>Register</a>
        or
        <a onClick={onLoginClick}>Login</a>
    </div>
}