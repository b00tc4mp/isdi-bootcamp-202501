function Landing({onRegisterClick, onLoginClick}) {

    return <div>
        <h1>Logo</h1>
        <a style={{cursor: "pointer"}} onClick={onRegisterClick}>Register</a>
        <a style={{ cursor: 'pointer', marginLeft: '25px' }} onClick={onLoginClick}>Login</a>
    </div>
}

