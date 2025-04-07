import { logic } from '../logic'
import { useContext } from '../context'

export function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const { alert } = useContext()

    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            logic.loginUser(username, password)
                .then(() => {
                    form.reset()
                    onUserLoggedIn()
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

    console.debug('Login -> render')

    return (
        <div className="max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg bg-white bg-opacity-80">
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

            <form onSubmit={handleLoginSubmit} className="form">
                <div className="field">
                    <label htmlFor="username" className="text-sm font-semibold">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="username"
                        className="input"
                    />
                </div>

                <div className="field">
                    <label htmlFor="password" className="text-sm font-semibold">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="password"
                        className="input"
                    />
                </div>

                <button type="submit" className="mt-4">Login</button>
            </form>

            <p className="mt-4 text-sm text-center">
                Don't have an account?{' '}
                <a onClick={handleRegisterClick} className="underline cursor-pointer hover:text-[var(--color-high)]">
                    Register
                </a>
            </p>
        </div>
    )
}
