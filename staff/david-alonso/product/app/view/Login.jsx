// lOGIN
import { logic } from "../logic/index.js"
import { useContext } from '../context'

export function Login({ onNavigateToRegister, onUserLoggedIn }) {

    const { alert } = useContext()

    //  Para manejar el evento de envío del formulario del Login
    const handleLoginSubmit = event => {
        // Evita recargar la pagina al enviar el formulario
        event.preventDefault()

        try {
            // Se extrae el target del "event" que es el formulario que se envio
            // Se almacena en la variable form
            const { target: form } = event

            // Se extraen los valores ingresados en el formulario
            const {
                username: { value: username },
                password: { value: password }
            } = form

            // Llamamos a la funcion para validar los valores del formulario
            logic.loginUser(username, password)
                .then(() => {
                    // Reseteamos el formulario
                    form.reset()

                    // Llamamos a la funcion para actualizar la pagina
                    onUserLoggedIn()
                })
                .catch(error => {
                    // Muestra si hay errores
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            // Muestra si hay errores
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

    console.debug('Login -> render')

    return <div className="loginRegister">

        <img src="./view/images/MX.jpg" className="fondo" />

        <div className="form-style">
            <h1>SIGN IN</h1>

            <form onSubmit={handleLoginSubmit} >

                <input type="text" id="username" placeholder=" USERNAME" className="input" />

                <input type="password" id="password" placeholder=" PASSWORD" className="input" />

                <button type="submit" >LOGIN</button>
            </form>

            <div >
                <a onClick={handleRegisterClick} className="anchor-form">REGISTER</a>
            </div>
        </div>



    </div>
}
