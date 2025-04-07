import {Logo} from './components/Logo'

export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()
    const handleLoginClick = () => onNavigateToLogin()
    
    return <div>
        <Logo />
        <div className="register-or-login">
            <a onClick={handleRegisterClick}>Register</a>
            <span> or </span>
            <a onClick={handleLoginClick}>Login</a>
        </div>
    </div>
}