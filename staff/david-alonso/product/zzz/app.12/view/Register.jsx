// REGISTRO

function Register({ onLoginClick, onRegisterSubmit }) {

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
            onLoginClick.RegisterUser(name, email, username, password)

            // Reseteamos el formulario
            form.reset()

            // Llamamos a la funcion para actualizar la pagina
            onRegisterSubmit()
        } catch (error) {
            // Muestra si hay errores
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Register -> render')

    return <div>
        <h1>Register</h1>

        <form onSubmit={handleRegisterSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <input type="text" id="password" />

            <button type="submit">Register</button>
        </form>

        <a onClick={onLoginClick}>Login</a>
    </div>
}