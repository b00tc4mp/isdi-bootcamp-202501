import { Routes, Route, useLocation } from "react-router"

import { Vehicles } from "./Vehicles.jsx"

import { Link } from "react-router"

export function Home({ handleNavigateVehicleRegister }) {
    const { pathname } = useLocation()


    const handleAddVehicle = () => {

        try {

            handleNavigateVehicleRegister()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    console.debug('Home -> render')

    return <div className="min-h-screen flex flex-col p-5">

        <header className="fixed top-0 left-0 w-full flex items-center p-6 mt-5 z-50">
            <div>
                <Link to="/menu" className="text-white">MENU</Link>
            </div>

            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl text-white">RIDECARE</h1>
        </header>

        <main className="flex-grow w-full pt-35 ">

            <Routes>
                <Route path="/" element={<Vehicles />} />
            </Routes>

        </main>

        <footer className="flex justify-between w-full gap-15 pb-10">
            <button type="button" onClick={handleAddVehicle} >Añadir Vehiculo</button>
        </footer>
    </div>


}