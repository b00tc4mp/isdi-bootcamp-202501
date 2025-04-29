import { logic } from '../logic/index.js'
import { useContext } from '../context.js'


export function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const { alert, confirm } = useContext()


    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            logic.loginUser(username, password)
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

    const handleRegisterClick = () => onNavigateToRegister()

    console.debug('Login -> render')

    return <div className='flex flex-col items-center justify-center h-screen'>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit} >
            <div className='field'>
                <label htmlFor="Username">Username</label>
                <input type="text" id="username" />
            </div>

            <div className='field'>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
            </div>


            <button type="submit">Login</button>
        </form>
        <a onClick={handleRegisterClick}>I don't have an account, REGISTER</a>

    </div>
}