import { logic } from '../logic'
import { Alert } from './Alert'

export function Login ({ onNavigateToRegister, onUserLoggedIn }) {
    const [feedback, setFeedback] = useState('')

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

                    //alert(error.message)
                    setFeedback(error.message)
                })

        } catch (error) {
            console.error(error)

            //alert(error.message)
            setFeedback(error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

    const handleAlertAccepted = () => setFeedback('')

    console.debug('Login -> render')

    return <>
        <div>
            <h1>Logo</h1>
            <h3>Login</h3>
            <form onSubmit={handleLoginSubmit}>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"/>
                </div>
                    
                <button type="submit" className="bg-[var(--first-color)] text-color rounded text-xl border-none">Login</button>
            </form>
            <a onClick={handleRegisterClick} className="block bg-transparent text-color border border-color rounded px-4 py-1 m-4 text-center">Register</a>

            {feedback && <Alert title="Oops" message={feedback} onAccept={handleAlertAccepted} />}
        </div>
    </>
}
