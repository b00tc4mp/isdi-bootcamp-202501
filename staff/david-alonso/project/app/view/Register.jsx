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

    return <div className="flex flex-col p-20 justify-center items-center">
        <h1 className="text-2xl m-5">REGISTRO</h1>

        <div className="">
            <form onSubmit={handleRegisterSubmit} className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl/30 space-y-4">

                <input type="text" id="name" placeholder="Name" />

                <input type="email" id="email" placeholder="E-mail" />

                <input type="text" id="password" placeholder="Password" />

                <button type="submit" >SIGUIENTE</button>

                <div className="flex justify-center">
                    <Link to="/login" className='underline' >LOGIN</Link>
                </div>
            </form>
        </div>

    </div>

}