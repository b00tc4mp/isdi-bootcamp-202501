import { useContext } from '../context'
import { logic } from '../logic'

export function Login({ onUserLoggedIn, onNavigateToRegister }) {
    const { alert } = useContext()

    const handleLoginSubmit = event => {
        event.preventDefault()
        try {
            const form = event.target
            const username = form.username.value
            const password = form.password.value

            logic.loginUser(username, password)
                .then(() => {
                    form.reset()
                    onUserLoggedIn()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-periwinkle to-mauve p-6">
            <h1 className="text-4xl font-extrabold text-purple-900 mb-8 drop-shadow-md">🔐 Inicia Sesión</h1>

            <form
                onSubmit={handleLoginSubmit}
                className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4"
            >
                <div className="text-left">
                    <label htmlFor="username" className="block text-purple-800 font-semibold">Usuario</label>
                    <input
                        id="username"
                        type="text"
                        className="w-full mt-1 p-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-mauve"
                    />
                </div>

                <div className="text-left">
                    <label htmlFor="password" className="block text-purple-800 font-semibold">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full mt-1 p-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-mauve"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition"
                >
                    Entrar
                </button>
            </form>

            <p className="mt-4 text-purple-700 text-sm">
                ¿Aún no tienes cuenta?{' '}
                <button onClick={handleRegisterClick} className="underline hover:text-purple-900">
                    Regístrate
                </button>
            </p>
        </div>
    )
}
