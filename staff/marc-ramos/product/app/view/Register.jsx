import { logic } from '../logic/index.js'
import { errors } from 'com'
import { useContext } from '../context'

const { SystemError, ValidationError } = errors

export function Register({ onNavigateToLogin, onUserRegistered }) {
    const { alert } = useContext()

    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form

            logic.registerUser(name, email, username, password)
                .then(() => {
                    form.reset()
                    onUserRegistered()
                })
                .catch(error => {
                    console.error(error)
                    if (error instanceof SystemError)
                        alert('⛔️ ' + error.message)
                    else
                        alert('⚠️ ' + error.message)
                })
        } catch (error) {
            console.error(error)
            if (error instanceof ValidationError)
                alert('❗️ ' + error.message)
            else
                alert('⛔️ ' + error.message)
        }
    }

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Register -> render')

    return (
        <div className="max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg bg-white bg-opacity-80">
            <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

            <form onSubmit={handleRegisterSubmit} className="form">
                <div className="field">
                    <label htmlFor="name" className="text-sm font-semibold">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="name"
                        className="input"
                    />
                </div>

                <div className="field">
                    <label htmlFor="email" className="text-sm font-semibold">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="email"
                        className="input"
                    />
                </div>

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

                <button type="submit" className="mt-4">Register</button>
            </form>

            <p className="mt-4 text-sm text-center">
                Already have an account?{' '}
                <a onClick={handleLoginClick} className="underline cursor-pointer hover:text-[var(--color-high)]">
                    Login
                </a>
            </p>
        </div>
    )
}
