export function Landing({ onRegisterClick, onLoginClick }) {

    const handleRegisterClick = () => onRegisterClick()

    const handleLoginClick = () => onLoginClick()


    console.debug('Landing -> render')

    return <div>
        <h1 className="logo-hogwarts"></h1>
        <p className="landing">
            <a onClick={handleRegisterClick}>Register</a> or <a onClick={handleLoginClick}>Login</a>
        </p>

    </div>
}

