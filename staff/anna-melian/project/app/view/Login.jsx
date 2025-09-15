import { logic } from '../logic/index.js'
import { useContext } from '../context.js'


export function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const { alert, confirm } = useContext()

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

    return <div className="flex flex-col items-center justify-center h-screen bg-white text-fuchsia-900">
        <h1 className="text-3xl font-extrabold mb-8">Login</h1>

        <form
            onSubmit={handleLoginSubmit}
            className="w-[90%] max-w-sm bg-gradient-to-br from-fuchsia-100 via-pink-100 to-amber-50 p-6 rounded-2xl shadow-2xl border border-fuchsia-300"
        >
            <div className="field">
                <label htmlFor="username" className="font-semibold text-fuchsia-900">Username</label>
                <input
                    type="text"
                    id="username"
                    className="input-color border-pink-400 focus:border-pink-600 bg-pink-50 text-pink-900 placeholder-pink-400 shadow-sm focus:ring-2 focus:ring-fuchsia-300 transition duration-200"
                />
            </div>

            <div className="field">
                <label htmlFor="password" className="font-semibold text-fuchsia-900">Password</label>
                <input
                    type="password"
                    id="password"
                    className="input-color border-purple-400 focus:border-purple-600 bg-purple-50 text-purple-900 placeholder-purple-400 shadow-sm focus:ring-2 focus:ring-purple-300 transition duration-200"
                />
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="form-button rounded-full"
                >
                    Login
                </button>
            </div>
        </form>

        <div className="mt-4 flex justify-center">
            <a
                onClick={handleRegisterClick}
                className="underline hover:transition duration-200 cursor-pointer"
            >
                I don't have an account, REGISTER
            </a>
        </div>
    </div>

}