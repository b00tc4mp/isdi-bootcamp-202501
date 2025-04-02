// REGISTRO

import { logic } from "../logic/index.js"

export function Register({ onNavigateToLogin, onUserRegistered }) {

    //  Para manejar el evento de envío del formulario del Registro
    const handleRegisterSubmit = event => {
        // Evita recargar la pagina al enviar el formulario
        event.preventDefault()

        try {
            // Se extrae el target del "event" que es el formulario que se envio
            // Se almacena en la variable form
            const { target: form } = event

            // Se extraen los valores ingresados en el formulario
            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form

            // Llamamos a la funcion para validar los valores del formulario
            logic.registerUser(name, email, username, password)
                .then(() => {
                    // Reseteamos el formulario
                    form.reset()

                    // Llamamos a la funcion para actualizar la pagina
                    onUserRegistered()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            // Muestra si hay errores
            console.error(error)

            alert(error.message)
        }
    }

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Register -> render')

    return <div className="loginRegister">

        <img src="./view/images/MX.jpg" className="fondo" />

        <div className="formRegister">
            <h1>CREATE ACCOUNT</h1>

            <form onSubmit={handleRegisterSubmit} >

                <input type="text" id="name" placeholder=" NAME" className="input" />

                <input type="text" id="email" placeholder=" E-MAIL" className="input" />

                <input type="text" id="username" placeholder=" USERNAME" className="input" />

                <input type="text" id="password" placeholder=" PASSWORD" className="input" />

                <button type="submit" >REGISTER</button>
            </form>

            <div >
                <a onClick={handleLoginClick} className="anchorLogin">LOGIN</a>
            </div>
        </div>

    </div>
}
