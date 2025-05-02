import { logic } from '../logic/index.js'
import { useContext } from '../context'
import { Link } from 'react-router'

export function Login({ onNavigateToRegister, onUserLoggedIn }) {

    const { alert } = useContext()

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
                    // Muestra si hay errores
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

    return <div className="relative min-h-screen">

        <div className="relative z-10 flex flex-col p-5 justify-between min-h-screen">
            <div className="flex flex-col items-center mt-20">
                <h1 className="text-6xl tracking-widest">R I D E</h1>
                <h1 className="text-6xl tracking-wide text-gray-400 ">C A R E</h1>
            </div>

            <div className="flex justify-center mt-auto">
                <form onSubmit={handleLoginSubmit} >

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" />

                    <button type="submit" >ENTRAR</button>

                    <div className="flex justify-center space-x-2 text-white pb-5">
                        <span>¿Aún no tienes cuenta? </span>
                        <Link to="/register" className='underline'>Registrate aquí</Link>
                    </div>

                </form>
            </div>

        </div>
    </div>
}