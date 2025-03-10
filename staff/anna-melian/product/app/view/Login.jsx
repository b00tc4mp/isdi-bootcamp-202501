import logic from '../logic.js'

import { useState, useEffect } from 'react'


function Login({ onRegisterClick, onLoginSubmit }) {
    const [showPassword, setShowPassword] = useState(false)
    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            logic.loginUser(username, password)

            form.reset()

            onLoginSubmit()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleRegisterClick = () => onRegisterClick()

    console.debug('Login -> render')

    return <>
        <h1 className="logo-hogwarts"></h1>

        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />

                <label htmlFor="password">Password</label>
                <div>
                    <input type={showPassword ? 'text' : 'password'} id="password" />
                    <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>


                <button type="submit">Login</button>
            </form>

            <a onClick={handleRegisterClick}>Register</a>
        </div>
    </>
}

export default Login