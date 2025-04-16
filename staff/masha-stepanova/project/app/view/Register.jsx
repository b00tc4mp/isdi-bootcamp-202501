import { useContext } from '../context'

import { logic } from '../logic'

export const Register = ({ onUserRegistered, onNavigateToLogin }) => {
    const { alert } = useContext()

    const handleLoginClick = () => onNavigateToLogin()

    const handleRegisterSubmit = event => {
        event.preventDefault()
        try {
            const form = event.target
            const name = form.name.value
            const email = form.email.value
            const username = form.username.value
            const password = form.password.value
            const repeatedPassword = form.repeatedPassword.value

            logic.registerUser(name, email, username, password, repeatedPassword)
                .then(() => {
                    form.reset()
                    onUserRegistered()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-mauve to-periwinkle p-6">
            <h1 className="text-4xl font-extrabold text-purple-900 mb-8 drop-shadow-md">📝 Crea tu cuenta</h1>

            <form
                onSubmit={handleRegisterSubmit}
                className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4"
            >
                {[
                    { label: 'Nombre', id: 'name' },
                    { label: 'Email', id: 'email' },
                    { label: 'Usuario', id: 'username' },
                    { label: 'Contraseña', id: 'password', type: 'password' },
                    { label: 'Repite la contraseña', id: 'repeatedPassword', type: 'password' }
                ].map(({ label, id, type = 'text' }) => (
                    <div className="text-left" key={id}>
                        <label htmlFor={id} className="block text-purple-800 font-semibold">{label}</label>
                        <input
                            id={id}
                            type={type}
                            className="w-full mt-1 p-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-periwinkle"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition"
                >
                    Registrarme
                </button>
            </form>

            <p className="mt-4 text-purple-700 text-sm">
                ¿Ya tienes cuenta?{' '}
                <button onClick={handleLoginClick} className="underline hover:text-purple-900">
                    Inicia sesión
                </button>
            </p>
        </div>
    )
}
