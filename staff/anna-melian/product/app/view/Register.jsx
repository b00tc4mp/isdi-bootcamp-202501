import logic from '../logic.js'

const { useState } = React

function Register({ onLoginClick, onRegisterSubmit }) {
    const [showPassword, setShowPassword] = useState(false)

    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                house: { value: house },
                password: { value: password }
            } = form

            if (house === '') throw new Error('Choose your house')

            logic.registerUser(name, email, username, house, password)

            form.reset()

            onRegisterSubmit()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    console.debug('Register -> render')

    return <>
        <h1 className="logo-hogwarts"></h1>

        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>

                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" />
                </div>

                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div>

                <div className="field">
                    <label htmlFor="houses">Your house</label>
                    <select id="house">
                        <option value="">Choose your house 🔥✨</option>
                        <option value="gryffindor">🦁 Gryffindor</option>
                        <option value="ravenclaw">🦅 Ravenclaw</option>
                        <option value="slytherin">🐍 Slytherin</option>
                        <option value="hufflepuff">🦡 Hufflepuff</option>
                    </select>
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <div>
                        <input type={showPassword ? 'text' : 'password'} id="password" />
                        <button type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>

                <button type="submit">Register</button>
            </form>

            <a onClick={onLoginClick}>Login</a>

        </div>


    </>
}

export default Register