import { logic } from '../logic/index'
import { errors } from 'com'
import { useContext } from '../context'

const { SystemError, ValidationError } = errors


export function Register ({ onNavigateToLogin, onUserRegistered }) {
    const { alert } = useContext()
    
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try { 
            const { target: form } = event 

            const {
                name: { value: name },
                email: { value: email },
                password: { value: password }
            } = form

            logic.registerUser(name, email, password)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => {
                    console.error(error)
                    if(error instanceof SystemError)
                        alert('DANGER: ' + error.message)
                    else 
                        alert('Warning: ' + error.message)
                })
        } catch (error) {
            console.error(error)

            if(error instanceof ValidationError)
                alert('📢' + error.message)
            else
                alert('¡Ojo! ' + error.message)
        }
    }

    console.debug('Register page renderized')

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-200 p-6">
            <div className="bg-green-100/80 p-6 rounded-xl shadow-lg backdrop-blur-sm w-full max-w-sm">
                <img 
                    src="/logo.png" 
                    alt="Little Breakfast logo" 
                    className="w-24 h-auto mx-auto mb-4"
                />
                <h1 className="text-3xl font-semibold mb-8 text-green-900 text-center">¡Regístrate!</h1>

                <form onSubmit={handleRegisterSubmit} className="form">
                    <div className="field">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            className="input placeholder:text-green-600/40"
                            placeholder="Escriba su nombre"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="text"
                            id="email"
                            className="input placeholder:text-green-600/40"
                            placeholder="Escriba su correo electrónico"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="input placeholder:text-green-600/40"
                            placeholder="Escriba su contraseña"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-48 mx-auto bg-green-300 hover:bg-green-400  text-green-900 font-semibold rounded-md transition"
                        >Register
                    </button>
                </form>

                <p className="mt-4 text-sm text-green-900 text-center">¿Ya tienes una cuenta?{' '}
                <a onClick={onNavigateToLogin} className="text-sm underline text-green-900 cursor-pointer block transition-transform duration-400 hover:scale-125">¡Inicia sesión!</a>
                </p>
            </div>
        </div>
    )
}