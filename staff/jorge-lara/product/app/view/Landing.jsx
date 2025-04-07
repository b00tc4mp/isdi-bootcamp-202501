export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister();

    const handleLoginClick = () => onNavigateToLogin();
    return <div className='flex flex-col items-center justify-center text-center min-h-screen w-full'>
        <h1>Logo</h1>
        <a className='mt-[25px] hover:text-[var(--color-high)] hover:text-2xl' onClick={handleRegisterClick}>Register</a>
        <a className='mt-[25px] hover:text-[var(--color-high)] hover:text-2xl' onClick={handleLoginClick}>Login</a>
    </div>
}