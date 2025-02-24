function Landing({ onRegisterClick, onLoginClick }) {
    console.debug('Landing -> render')

    return <div style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: "center",height: "100vh", height:"100vh", backgroundColor:"gray"}}>
        <h1>Landing</h1>
        <a onClick={onRegisterClick}>Register</a> or <a onClick={onLoginClick}>Login</a>
    </div>
}