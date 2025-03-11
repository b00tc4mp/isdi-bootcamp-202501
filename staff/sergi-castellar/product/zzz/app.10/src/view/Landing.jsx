import Logo from './Logo.jsx'

function Landing({ onLoginClick, onRegisterClick }) {
    return <div>
        <Logo />
        <div id="register-or-login">
            <a onClick={onRegisterClick}>Register</a>
            <span> or </span>
            <a onClick={onLoginClick}>Login</a>
        </div>
    </div>
}

export default Landing