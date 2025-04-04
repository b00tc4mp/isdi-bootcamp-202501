function Landing({ onRegisterClick, onLoginClick }) {
    console.debug('Landing -> render')

    return <div>
        <h1>Logo</h1>
        <a onClick={onRegisterClick}>Register</a>or<a onClick={onLoginClick}>Login</a>
    </div>
}