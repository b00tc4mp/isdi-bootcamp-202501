/*
COMPO REACT DE LANDING:
-Creamos el compo y le pasamos dos propiedades:
    -onNavigateToRegister: función que se ejecutará cuando el usuario clique 'Register'
    -onNavigateToLogin: función que se ejecutará cuando el usuario clique 'Login'

    -handleRegisterClick: función que maneja el evento de click y llama a la función navigate que cambia de pantalla.
    -handleLoginClick: función que maneja el evento de click y llama a la función navigate que cambia de pantalla.

JSX(RENDERIZADO DEL COMPO)
*/


export function Landing({onNavigateToRegister, onNavigateToLogin}) {

    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    return <div className="landing-container">
        
        <div className="logo-container">
            <img src="doc\images\logo-bee-you.png" alt="Bee logo" className="bee-logo-landing" />
        </div>
        <div className="landing-buttons">
            <button onClick={handleRegisterClick}>Register</button>
            <span style={{ margin: "0 5px" }}>or</span>
            <button onClick={handleLoginClick}>Login</button>
        </div>

    </div>
}
