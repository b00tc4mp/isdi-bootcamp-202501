/*
IMPORTACIÓN MÓDULOS:
-useState, useEffect: hooks de React que para manejar estados y efectos secundarios.
-Routes y Route: compos de React-router para definir rutas y qué componentes se deben renderizar en función de esas rutas.
-useNavigate y Navigate: permiten la navegación programática y redirección dentro de la aplicación.
-Landing, Register, Login, Homepage: componentes que se van a renderizar en función de la ruta utilizada.
-logic: archivo que contiene las funciones de lógica.
*/

import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import  { Login } from './view/Login'
import { Homepage } from './view/Homepage/index'
import { Alert } from './view/Alert'
import { Confirm } from './view/Confirm'

import { logic } from './logic/index'
import { Context } from './context'
/*
COMPONENTE APP (PRINCIPAL)
-useState 1: estado para saber si el usuario está logueado. Inicialmente es null.
-useState 2: estado que maneja si mostrar landingpage o no. Inicialmente es true, pero en el caso que se esté logueado va a ser false.
-useNavigateuseEffect: Este hook se ejecuta después de que el componente se monta en el DOM. En este caso, se ejecuta una sola vez debido al array vacío [], lo que significa que no depende de ningún estado.

-useEffect para verificar si el usuario está logueado:
    -Este hook se ejecuta una sola vez (gracias al array vacío), lo que no depende de ningún estado.
    -Se llama a la función en la lógica para que verifique si el usuario está logueado.
    -Una vez verificado, se actualiza el estado en true o false.
    -Si hay un error se captura y muestra mensaje de alerta.

FUNCIONES DE NAVEGACIÓN:
Funciones para manejar la navegación y cambiar el estado de la aplicación.
Se activan cuando un usuario hace click en un botón o enlace.
-handleNavigateToRegister: oculta la pantalla de bienvenida y lleva al usuario a la pantalla de registro.
    -setShowLanding(false): escondemos landing page.
    -usamos el hook useNavigate para redirigir a la pagina register.

-handleNavigateToLogin: cambia la vista a la página de login.

-handleReturnClick: retornamos a landing page.

-handleUserRegistered: una vez registrado el usuario, se redirige a login para que inicie sesión.

-handleUserLoggedIn: una vez el usuario a iniciado sesión, se cambia el estado de loggedIn a true y navegamos a homepage.

-handleUserLoggedOut: si el clica en cerrar sesión, cambia le estado de loggedIn a false y navegamos a la pagina de login.

RETURN: RENDERIZACIÓN DE RUTAS CON REACT-ROUTER

-Dentro del bloque <Routes> se definen las diferentes rutas y los componentes que hay que renderizar.

-En este caso, solo nos cambiará de página en el caso que loggedIn no sea null. Si es null, es que algo ha pasado,
ya que esperamos que loggedIn sea true o false.

Rutas: 
    -Ruta /landing:
        -Si el usuario está logueado, navegamos directamente a homepage (/).
        -Si no lo está, se renderiza el componente Landing, donde se pasan dos funciones como props del compo:
            -onNavigateToRegister: para redirigir al usuario a la página de registro.
            -onNavigateToLogin: para redirigir al usuario a login.
    -Ruta /register:
        -Si el usuario está logueado, navegamos a homepage.
        -Si no lo está, se renderiza el componente Register, donde se pasan dos funciones:
            -onUserRegistered: función que maneja el envento de cuando un usuario se ha registrado correctamente.
            -onReturnClick: función que maneja el evento de volver a atrás.

    -Ruta /login.

    -Ruta /*: ruta por defecto. Ruta comodín que captura cualquier URL no especificada anteriormente.
        -Si el usuario está logueado, navegamos a homepage, donde pasamos la función loggedOut para manejar
        el cierre de sesión.
        -Si el usuario NO está logueado, en función del estado de showLanding:
            -Navegamos a /landing si es true.
            -Navegamos a /login si es false.
*/


function App() {

    const [loggedIn, setLoggedIn] = useState(null)
    const [showLanding, setShowLanding] = useState(true)
    const [alertMessage, setAlertMessage] = useState('')
    const [confirmMessage, setConfirmMessage] = useState('')
    const [confirmState, setConfirmState] = useState(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            setLoggedIn(loggedIn)
        } catch (error) {
            console.error(error)

            alert(error.messsage)
        }
    }, [])

    const handleNavigateToRegister = () => {
        navigate('/register')
    }

    const handleNavigateToLogin = () => {
        navigate('/login')
    }
    const handleReturnClick = () => {
        setShowLanding(true)
        navigate('/landing')
    }
    const handleUserRegistered = () => {
        setShowLanding(false)
        navigate('/login')
    }
    const handleUserLoggedIn = () => {
        setShowLanding(false)
        setLoggedIn(true)
        navigate('/')
    }
    const handleUserLoggedOut = () => {
        setShowLanding(false)
        setLoggedIn(false)
        navigate('/login')
    }

    const handleShowAlert = message => setAlertMessage(message)

    const handleAlertAccepted = () => setAlertMessage('')

    const handleShowConfirm = message => {
        return new Promise((resolve, _reject) => {
            setConfirmMessage(message)
            setConfirmState({ resolve })
        })
    }

    const handleConfirmAccepted = () => {
        confirmState.resolve(true)
        setConfirmMessage('')
        setConfirmState(null)
    }

    const handleConfirmCancelled = () => {
        confirmState.resolve(false)
        setConfirmMessage('')
        setConfirmState(null)
    }

    console.debug('App -> render')

    return <Context value={{
        alert: handleShowAlert,
        confirm: handleShowConfirm
    }}>
        {loggedIn !== null && <Routes>
            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register
            onUserRegistered={handleUserRegistered}
            onReturnClick={handleReturnClick} /> } />

            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login 
            onUserLoggedIn={handleUserLoggedIn}
            onReturnClick={handleReturnClick} /> } />

            <Route path="/*" element={loggedIn ? <Homepage
            onUserLoggedOut={handleUserLoggedOut} /> : showLanding ? <Landing 
            onNavigateToRegister={handleNavigateToRegister} 
            onNavigateToLogin={handleNavigateToLogin} /> : <Navigate to='/login' />} />
        </Routes>}
        
        {alertMessage && <Alert title="⚠️" message={alertMessage} onAccepted={handleAlertAccepted} />}
        {confirmMessage && <Confirm title="❔" message={confirmMessage} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context>
}
export default App