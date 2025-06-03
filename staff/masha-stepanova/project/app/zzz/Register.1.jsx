import { useContext } from '../context'

import { logic } from '../logic'


export const Register = ({ onUserRegistered, onNavigateToLogin }) => {
    const { alert } = useContext()

    const handleLoginClick = () => {
        onNavigateToLogin()
    }

    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                repeatedPassword: { value: repeatedPassword }
            } = form

            console.log(name, email, username, password, repeatedPassword)

            logic.registerUser(name, email, username, password, repeatedPassword)
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

    return <>
        <div>
            <h1>Logo</h1>

            <form onSubmit={handleRegisterSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" />

                <label htmlFor="email">Email</label>
                <input type="text" id="email" />

                <label htmlFor="username">Username</label>
                <input type="text" id="username" />

                <label htmlFor="password">Password</label>
                <input type="text" id="password" />

                <label htmlFor="repeatedPassword">Repeat password</label>
                <input type="text" id="repeatedPassword" />

                <button type="submit">Register</button>
            </form>

            <a onClick={handleLoginClick}>Login</a>
        </div>
    </>

}