import { logic } from "../logic/index.js"
import { errors } from 'com'
import { useContext } from '../context.js'


const { SystemError, ValidationError } = errors

export function Register({ onNavigateToLogin, onUserRegistered }) {
    const { alert, confirm } = useContext()


    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form

            logic.registerUser(name, email, username, password)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => {
                    console.error(error)

                    if (error instanceof SystemError)
                        alert('⛔️ ' + error.message)
                    else
                        alert('⚠️ ' + error.message)
                })

        } catch (error) {
            console.error(error)

            if (error instanceof ValidationError)
                alert('❗️ ' + error.message)
            else
                alert('⛔️ ' + error.message)
        }
    }

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Register -> render')

    return <div className="flex flex-col items-center justify-center h-screen bg-white text-fuchsia-900">
        <h1 className="text-3xl font-extrabold mb-8">Register </h1>

        <form
            onSubmit={handleRegisterSubmit}
            className="w-[90%] max-w-sm bg-gradient-to-br from-fuchsia-100 via-pink-100 to-amber-50 p-6 rounded-2xl shadow-2xl border border-fuchsia-300"
        >
            <div className="field">
                <label htmlFor="name" className="font-semibold text-fuchsia-900">Name</label>
                <input
                    type="text"
                    id="name"
                    className="px-3 py-2 rounded-lg border-2 border-fuchsia-400 focus:border-fuchisa-700 bg-fuchsia-50 text-fuchsia-900 placeholder-fuchsia-400 shadow-sm focus:ring-2 focus:ring-pink-300 transition duration-200"
                />
            </div>

            <div className="field">
                <label htmlFor="username" className="font-semibold text-fuchsia-900">Username</label>
                <input
                    type="text"
                    id="username"
                    className="px-3 py-2 rounded-lg border-2 border-pink-400 focus:border-pink-600 bg-pink-50 text-pink-900 placeholder-pink-400 shadow-sm focus:ring-2 focus:ring-fuchsia-300 transition duration-200"
                />
            </div>

            <div className="field">
                <label htmlFor="email" className="font-semibold text-fuchsia-900">E-mail</label>
                <input
                    type="email"
                    id="email"
                    className="px-3 py-2 rounded-lg border-2 border-amber-400 focus:border-yellow-600 bg-amber-50 text-yellow-900 placeholder-yellow-500 shadow-sm focus:ring-2 focus:ring-amber-300 transition duration-200"
                />
            </div>

            <div className="field">
                <label htmlFor="password" className="font-semibold text-fuchsia-900">Password</label>
                <input
                    type="password"
                    id="password"
                    className="px-3 py-2 rounded-lg border-2 border-purple-400 focus:border-purple-600 bg-purple-50 text-purple-900 placeholder-purple-400 shadow-sm focus:ring-2 focus:ring-purple-300 transition duration-200"
                />
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className=" form-button rounded-full"
                >
                    Register
                </button>
            </div>
        </form>

        <div className="mt-4 flex justify-center">
            <a
                onClick={handleLoginClick}
                className="underline hover:transition duration-200 cursor-pointer"
            >
                I already have an account, LOGIN
            </a>
        </div>
    </div>



}