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

    return <div className="relative min-h-screen">

        <div className="relative z-10 flex flex-col p-5 justify-between min-h-screen">

            <header className="fixed top-0 left-0 w-full flex items-center p-6 mt-5">
                <div>
                    <Link to="/menu" className="text-white">MENU</Link>
                </div>
                <div className="flex-1 flex justify-center">
                    <h1 className="text-2xl text-white">R I D E C A R E</h1>
                </div>
                <div className="w-40"></div>
            </header>

            <main className="flex-grow w-full pt-20 ">

                <Routes>
                    <Route path="/" element={<Vehicles />} />
                </Routes>

            </main>

            <footer className="flex justify-between w-full gap-15 pb-10">
                <button type="button" onClick={handleAddVehicle} >Añadir Vehiculo</button>
            </footer>
        </div>
    </div>

}