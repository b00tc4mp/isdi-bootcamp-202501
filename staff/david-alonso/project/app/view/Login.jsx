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

    return <div className="flex flex-col p-20 justify-center items-center">
        <h1 className="text-2xl m-5">LOGIN</h1>

        <div className="">
            <form onSubmit={handleLoginSubmit} >

                <input type="email" id="email" placeholder="Email" />

                <input type="password" id="password" placeholder="Password" />

                <button type="submit" >SIGUIENTE</button>

                <div className="flex justify-center">
                    <Link to="/register" className='underline'>REGISTRO</Link>
                </div>

            </form>
        </div>

    </div>
}