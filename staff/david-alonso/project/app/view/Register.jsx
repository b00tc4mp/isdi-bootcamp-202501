import { logic } from '../logic/index.js'
import { useContext } from '../context'
import { Link } from 'react-router'

export function Register({ onNavigateToLogin, onUserRegistered }) {

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

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    console.debug('Register -> render')

    return <div className="relative min-h-screen">

        <div className="relative z-10 flex flex-col p-5 justify-between min-h-screen">

            <div className="flex flex-col items-center mt-20">
                <img src="/images/logo.svg" />
            </div>

            <div className="flex justify-center mt-auto">
                <form onSubmit={handleRegisterSubmit}>

                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="name" />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />

                    <label htmlFor="contraseña">Contraseña</label>
                    <input type="text" id="password" />

                    <button type="submit" >CREAR CUENTA</button>

                    <div className="flex justify-center space-x-2 text-white pb-5">
                        <span>¿Ya tienes cuenta? </span>
                        <Link to="/login" className='underline' >Entra aquí</Link>
                    </div>
                </form>
            </div>

        </div>
    </div>
}