import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, Navigate } from "react-router"

import { Register } from './view/Register'
import { Login } from "./view/Login"
import { VehicleRegister } from './view/pages/VehicleRegister.jsx'
import { Vehicles } from "./view/pages/Vehicles.jsx"
import { Home } from "./view/pages/Home.jsx"
import { Menu } from "./view/pages/Menu.jsx"
import { Alert } from './view/Alert.jsx'
import { Confirm } from './view/Confirm.jsx'
import { PdfMaintenances } from "./view/components/PdfMaintenances.jsx"

import { MaintenanceDetail } from "./view/pages/MaintenanceDetail.jsx"
import { ProfileVehicle } from "./view/pages/ProfileVehicle.jsx"
import { Maintenance } from "./view/pages/Maintenance.jsx"
import { Context } from './context'
import { logic } from "./logic/index.js"

function App() {
    const [loggedIn, setLoggedIn] = useState(null)
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

    // Cambia hacia la pagina de Registro para rgistrarse
    const handleNavigateToRegister = () => {
        // setShowLanding(false)
        navigate('/register')
    }

    // Cambia hacia la pagina de Login para iniciar sesion
    const handleNavigateToLogin = () => {
        // setShowLanding(false)
        navigate('/login')
    }

    // Cambia hacia la pagina de Login despues de haberse registrado
    const handleUserRegistered = () => {
        // setShowLanding(false)
        navigate('/login')
    }

    const handleVehicleRegistered = () => {
        // setShowLanding(false)
        navigate('/')
    }

    // Cambia hacia la pagina de Home despues de hacer login
    const handleUserLoggedIn = () => {
        // setShowLanding(false)
        setLoggedIn(true)
        navigate('/')
    }
    // ****
    const handleNavigateVehicleRegister = () => {

        navigate('/vehicleRegister')
    }

    const handleNavigateToMenu = () => {

        navigate('/menu')
    }

    const handleMaintenanceRegistered = (id) => {
        navigate(`/vehicle/${id}`)
    }

    const handleUserLoggedOut = () => {
        setLoggedIn(false)
        navigate('/login')
    }

    const handleVehicleDeleted = () => {
        navigate('/')
    }

    const handleDeleteManteinanceClick = (id) => {
        navigate(`/vehicle/${id}`)
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


    return <Context value={{
        alert: handleShowAlert,
        confirm: handleShowConfirm

    }}>

        <img src="/images/Fondo.jpg" className="fondo" />

        {/* {loggedIn !== null && <Routes> */}
        {<Routes>

            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onNavigateToRegister={handleNavigateToRegister} onUserLoggedIn={handleUserLoggedIn} />} />
            {/* /login: Muestra el login si no está logueado. Si ya está logueado, lo manda al home / */}

            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onNavigateToLogin={handleNavigateToLogin} onUserRegistered={handleUserRegistered} />} />
            {/* /register: Muestra el registro si no está logueado. Si ya está logueado, lo manda al home / */}

            <Route path="/vehicleRegister/:id?" element={<VehicleRegister onVehicleRegistered={handleVehicleRegistered} />} />

            <Route path="/menu" element={<Menu onNavigateToMenu={handleNavigateToMenu} onUserLoggedOut={handleUserLoggedOut} />} />

            <Route path='/*' element={loggedIn ? <Home handleNavigateVehicleRegister={handleNavigateVehicleRegister} /> : <Navigate to='/login' />} />
            {/* Si ponemos una ruta que no existe y esta logeado lo mandamos a home /. Si no lo esta se le envia a /login */}

            <Route path="/vehicles" element={<Vehicles />} />

            <Route path="/vehicle/:id" element={<ProfileVehicle onVehicleDeleted={handleVehicleDeleted} />} />

            <Route path="/vehicle/:vehicleId/maintenance/:maintenanceId?" element={<Maintenance onMaintenanceRegistered={handleMaintenanceRegistered} />} />

            <Route path="/vehicle/:vehicleId/maintenance-detail/:maintenanceId" element={<MaintenanceDetail onDeletedManteinance={handleDeleteManteinanceClick} />} />

        </Routes>}

        {alertMessage && <Alert message={alertMessage} onAccepted={handleAlertAccepted} />}
        {confirmMessage && <Confirm message={confirmMessage} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}

    </Context>
}

export default App