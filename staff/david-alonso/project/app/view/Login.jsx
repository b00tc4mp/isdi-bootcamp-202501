import { useContext } from '../context'
import { logic } from '../logic/index.js'


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
            <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl/30 space-y-4">

                <input type="email" id="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg p-2 " />

                <input type="password" id="password" placeholder="Password" className="w-full border border-gray-300 rounded-lg p-2" />

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">SIGUIENTE</button>

                <div className="flex justify-center">
                    <a onClick={handleRegisterClick} className="underline">REGISTRO</a>
                </div>
            </form>
        </div>

    </div>
}