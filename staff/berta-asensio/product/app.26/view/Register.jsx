/*
COMPO REACT DE REGISTER: Maneja el registro de usuario.

-Importamos logic y errors.
-Extraemos errores que vamos a utilizar.

-Creamos componente Register con dos props:
    -onReturnClick: funciñon que se ejecuta cuando se hace clic a Return.
    -onUserRegistered: función que se ejecutra cuando el usuario se haya registrado correctamente.

    -handleRegisterSubmit: función principal que maneja el SUBMIT registro de usuario:
        TRY:
        -Extramos el form del evento. Event.target es el formulario que disparó el evento submit.
        -Extraemos los valores ingresados en el formulario. Cada campo del formulario tiene un value,
        que es el valor que el usuario ha ingresado.
        -Llamamos a la lógica(pasandole los valores capturados del formulario):
            -Then: Si el registro es exitoso, se resetea el formulario y se llama a onUserRegistered para actualizar
            el estado de la aplicación.
            -Catch: si ocurre un error durante el proceso de registro, se captura el error:
                -Si es instancia de SystemError, se muestra alerta grave.
                -Si no lo es, se muestra alerta de advertencia.
        CATCH:
        -Si ocurre un error durante la ejecución de try, se captura en este catch:
            -Si es instancia de ValidationError, muestra mensaje de validación.
            -Si no, alerta de advertencia.

JSX: RENDERIZADO DEL COMPONENTE.


 */

import { logic } from '../logic/index'
import { errors } from 'com'
import { useContext } from '../context'

const { SystemError, ValidationError } = errors

export function Register({onReturnClick, onUserRegistered}) {
    const { alert } = useContext()

    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { 
                name: { value: name },
                username: { value: username },
                password: { value: password },
                email: { value: email }
            } = form

            logic.registerUser(name, username, password, email)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => {
                    console.error(error)
                    //si el error que viene de la parte sincrona es un sistem error
                    if(error instanceof SystemError) 
                        alert('ERROR GRAVE: ' + error.message)
                    //si no mostramos alerta normal
                    else
                        alert('Warning ⚠' + error.message)
                })
        } catch (error) {
            console.error(error)

            if(error instanceof ValidationError)
                alert('❕' + error.message)
            else
            alert('Warning ⚠' + error.message)
        }
    }

    const handleReturnClick = () => onReturnClick()

    console.debug('Register -> render')

    return <div>
        <div className="register-login-header">   
            <img src="doc\images\logo-bee-you.png" alt="Bee logo" className="bee-logo-register-login" />
            <h2>...the new app to meet honey people!🍯</h2>
        </div>

        <p className="paragraph">Create account</p>

        <form onSubmit={handleRegisterSubmit}>
            <div className="field">
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    id="name"
                    className="input"
                    placeholder="Your name" 
                />
            </div>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username"
                    className="input"
                    placeholder="Introduce a username" 
                />
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password"
                    className="input"
                    placeholder="Introduce a password" 
                />
            </div>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email"
                    className="input"
                    placeholder="Your email" 
                />
            </div>

            <button type="submit">Register</button>
        </form>
        
        <a onClick={handleReturnClick}>Return</a>
    </div>
}
