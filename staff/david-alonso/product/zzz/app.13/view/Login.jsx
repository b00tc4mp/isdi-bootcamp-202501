// lOGIN

function Login({ onRegisterClick, onLoginSubmit }) {

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

            // Reseteamos el formulario
            form.reset()

            // Llamamos a la funcion para actualizar la pagina
            onLoginSubmit()
        } catch (error) {
            // Muestra si hay errores
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Login -> render')

    return <div >

        <img src="./view/images/fondo1.jpg" className="fondo" />

        <div className="ddd">
            <h1>SIGN IN</h1>

            <form onSubmit={handleLoginSubmit} >

                <input type="text" id="username" placeholder="USERNAME" className="input" />

                <input type="password" id="password" placeholder="PASSWORD" className="input" />

                <button type="submit" >LOGIN</button>
            </form>

            <div >
                <a onClick={onRegisterClick} className="anchorRegister">REGISTER</a>
            </div>
        </div>

    </div>
}