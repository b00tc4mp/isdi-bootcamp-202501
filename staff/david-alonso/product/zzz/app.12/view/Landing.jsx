function Landing({ onRegisterClick, onLoginClick }) {
    console.debug('Landing -> render')

    return <div>
        <h1>Landing</h1>
        <a onClick={onRegisterClick} >Register </a>
        or
        <a onClick={onLoginClick}> Login</a>
    </div>
}