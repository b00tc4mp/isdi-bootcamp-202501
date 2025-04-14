export function Landing({onNavigateToRegister, onNavigateToLogin}){
    const handleRegisterClick = () => onNavigateToRegister();

    const handleLoginClick = () => onNavigateToLogin();

    return <div>
        <h1>Logo</h1>
        <a onClick={handleRegisterClick}>Register</a>
        <a onClick={handleLoginClick}>Login</a>
    </div>
}