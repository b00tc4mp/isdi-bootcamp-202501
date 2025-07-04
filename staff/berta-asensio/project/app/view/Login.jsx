import { logic } from '../logic/index'

export function Login({ onUserLoggedIn, onNavigateToRegister }) {

    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                email: { value: email },
                password: { value: password }
            } = form

            logic.loginUser(email, password)
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

    console.debug('Login page renderized')

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-200 p-6">
            <div className="bg-green-100/80 p-6 rounded-xl shadow-lg backdrop-blur-sm w-full max-w-sm">
                <img 
                    src="/logo.png" 
                    alt="Little Breakfast logo" 
                    className="w-24 h-auto mx-auto mb-4"
                />
                <h1 className="text-3xl font-semibold mb-8 text-green-900 text-center">Inicia Sesión</h1>

                <form onSubmit={handleLoginSubmit} className="form">
                    <div className="field">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="text" 
                        id="email"
                        className="input placeholder:text-green-600/40"
                        placeholder="Introduce tu correo electrónico" 
                        />
                </div>

                <div className="field">
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="input placeholder:text-green-600/40"
                        placeholder="Introduce tu contraseña" 
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-48 mx-auto bg-green-300 hover:bg-green-400  text-green-900 font-semibold rounded-md transition"
                    >Iniciar sesión
                </button>
            </form>

            <p className="mt-4 text-sm text-green-900 text-center">¿Todavía no estás registrado?{' '}
                <a onClick={onNavigateToRegister} className="text-sm underline text-green-900 cursor-pointer block transition-transform duration-400 hover:scale-125">Regístrate</a>
            </p>
        </div>
    </div>
)
}