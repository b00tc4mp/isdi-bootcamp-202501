function Landing({ onRegisterClick, onLoginClick }) {
    console.debug('Landing -> render')

    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Landing</h1>
        <a onClick={onRegisterClick} style={{ textDecoration: 'underline' }}>Register</a>
        <p style={{ color: 'white', display: 'inline' }}>&nbsp; or &nbsp;</p>
        <a onClick={onLoginClick} style={{ textDecoration: 'underline' }}>Login</a>
    </div>
}