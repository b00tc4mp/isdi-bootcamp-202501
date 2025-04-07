import ballena from '../images/ballena.png'

export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()
    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Landing -> render')

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center text-center px-5">
            <div
                className="w-[230px] h-[150px] bg-center bg-no-repeat bg-cover mb-5"
                style={{ backgroundImage: `url(${ballena})` }}
            />
            <h1 className="text-4xl font-bold text-[#333] mb-2">Deepstagram</h1>
            <h4 className="text-lg text-gray-700 mb-6">¡Meet people, share contents, rate posts and more!</h4>
            <div className="space-x-2 text-lg">
                <a onClick={handleRegisterClick} className="underline cursor-pointer hover:text-[var(--color-high)]">Register</a>
                <span>or</span>
                <a onClick={handleLoginClick} className="underline cursor-pointer hover:text-[var(--color-high)]">Login</a>
            </div>
        </div>
    )
}
