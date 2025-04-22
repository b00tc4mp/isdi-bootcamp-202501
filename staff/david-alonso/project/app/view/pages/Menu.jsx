import { logic } from '../../logic'
import { Link } from 'react-router'

import { X } from 'lucide-react'

export function Menu({ onUserLoggedOut }) {

    const handleLogoutClick = () => {

        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    console.debug('Menu -> render')

    return <div className="min-h-screen flex flex-col p-5">

        <header className="fixed top-0 left-0 w-full flex items-center p-6 mt-5 z-50">
            <div>
                <Link to="/" ><X color="white" size={24} /></Link>
            </div>

            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl text-white">RIDECARE</h1>
        </header>

        <div className="flex flex-col flex-1 w-full pt-20 text-3xl gap-10 mt-10">
            <Link to="/" className="text-white">- Vehiculos</Link>

            <Link to="/" className="text-white">- Talleres</Link>

            <Link to="/" className="text-white">- Gasolineras</Link>
        </div>

        <footer className="flex justify-between w-full gap-15 pb-5">
            <button type="button" onClick={handleLogoutClick} >LOGOUT</button>
        </footer>

    </div>
}