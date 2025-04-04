import { useState } from 'react'
import { logic } from '../logic'
import { Alert } from './Alert'

export function Login({ onNavigateToRegister, onUserLoggedIn }) {
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

            // alert(error.message)
            setFeedback(error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

    const handleAlertAccepted = () => setFeedback('')

    console.debug('Login -> render')

    return <div>
        <h1>Logo</h1>

        <form onSubmit={handleLoginSubmit}>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="username" />
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="password" />
            </div>

            <button type="submit">Login</button>
        </form>

        <a onClick={handleRegisterClick}>Register</a>

        {feedback && <Alert title="Ooups" message={feedback} onAccept={handleAlertAccepted} />}
    </div>
}