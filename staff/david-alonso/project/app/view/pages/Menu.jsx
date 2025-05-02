import { logic } from '../../logic'
import { Link } from 'react-router'

import { useContext } from '../../context'
import { X, Fuel } from 'lucide-react'

export function Menu({ onUserLoggedOut }) {
    const { alert } = useContext()


    const handleLogoutClick = () => {

        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }


    return <div className="relative min-h-screen">


        <div className="relative z-10 flex flex-col p-5 justify-between min-h-screen">

            <header className="fixed top-0 left-0 w-full flex items-center p-6 mt-5 z-50">
                <div className="flex-1 flex items-center">
                    <Link to="/" ><X color="white" size={24} /></Link>
                </div>
                <div className="flex-1 flex justify-center">
                    <h1 className="text-2xl text-white tracking-[0.2em]">RIDECARE</h1>
                </div>
                <div className="flex-1"></div>
            </header>

            <div className="flex flex-col flex-1 w-full pt-20 text-3xl gap-15 mt-10 m-5">
                <Link to="/" className="text-white">Vehiculos</Link>

                <Link className="text-white">Gasolineras</Link>

                <Link className="text-white">Talleres</Link>
            </div>

            <footer className="flex justify-between w-full gap-15 pb-5">
                <button type="button" className='cursor-pointer' onClick={handleLogoutClick} >LOGOUT</button>
            </footer>

        </div>
    </div>
}


