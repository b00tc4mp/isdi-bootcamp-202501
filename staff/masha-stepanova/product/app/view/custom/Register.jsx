import { logic } from '../../logic/index'

export function Register({ onNavigateToLogin, onUserRegistered }) {

    const handleUserRegistered = event => {
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
                .then(() => onUserRegistered())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    const handleLoginClick = () => onNavigateToLogin()

    return <div className="form">

        <h1>Foodies</h1>
        <form onSubmit={handleUserRegistered} >

            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <button type="submit">Submit</button>
        </form>
        <a onClick={handleLoginClick}>Login</a>
    </div>
}