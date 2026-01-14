import { Vehicles } from "./Vehicles.jsx"
import { useContext } from '../../context'

import { Link } from "react-router"
import { AlignJustify } from "lucide-react"

export function Home({ handleNavigateVehicleRegister }) {

    const { alert } = useContext()

    const handleAddVehicle = () => {

        try {

            handleNavigateVehicleRegister()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    console.debug('Home -> render')

    return (
        <div className="relative min-h-screen">
            <div className="relative z-10 flex flex-col p-5 justify-between min-h-screen">

                <header className="fixed top-0 left-0 w-full flex items-center  mt-10">
                    <div className="flex-1 flex items-center">
                        <Link to="/menu" className="ml-5">
                            <AlignJustify />
                        </Link>
                    </div>

                    <div className="flex-1 flex justify-center">
                        <h1 className="text-2xl text-white tracking-[0.2em]">RIDECARE</h1>
                    </div>

                    <div className="flex-1"></div>
                </header>

                <main className="flex-grow w-full pt-25">
                    <Vehicles />
                </main>

                <footer className="flex justify-between w-full gap-15 pt-5 pb-5">
                    <button type="button" className="cursor-pointer" onClick={handleAddVehicle}>AÑADIR VEHÍCULO </button>
                </footer>
            </div>
        </div>
    )

}