function Landing() {
    const handleClickLogin = () => {
        root.render(<Login />)
    }

    const handleClickRegister = () => {
        root.render(<Register />)
    }

    return <div>
        <h1>Logo</h1>
        <a style={{cursor: "pointer"}} onClick={handleClickRegister}>Register</a>
        <a style={{ cursor: 'pointer', marginLeft: '25px' }} onClick={handleClickLogin}>Login</a>
    </div>
}

