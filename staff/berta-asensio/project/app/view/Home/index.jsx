import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { logic } from '../../logic/index'
import { useContext } from '../../context'

export function Home({ onUserLoggedOut }) {
    const { alert, confirm } = useContext()
    const[userName, setUserName] = useState('')
    const [credit, setCredit] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        try {
            logic.getUserName()
                .then(name => setUserName(name))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

            logic.getUserCredit()
                .then(setCredit)
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
            
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleLogoutClick = () => {
        confirm('¿Estás seguro que quieres cerrar sesión?')
            .then(accepted => {
                if(accepted)
                    try {
                        logic.logoutUser()

                        onUserLoggedOut()
                    } catch(error) {
                        console.error(error)

                        alert(error.message)
                    }
            })
    }

    const handleNavigateTo = (path) => navigate(path)
    

    console.debug('Home page renderized')

    return (
        <div className="min-h-screen flex flex-col items-center bg-green-200 p-6">
            <header className="w-full flex justify-between items-center mb-6 px-4">
                <img
                    src="/logo.png"
                    alt="Little Breakfast logo"
                    className="w-30"
                />

                {credit !== null && (
                    <p className="text-green-900 font-semibold">
                        Crédito disponible: {credit.toFixed(2)} €
                    </p>
                )}
            </header>
            <div className="text-3xl font-semibold text-green-900 mb-2">

                <h1>¡Hola {userName}!</h1>

            </div>

            <main className="w-full max-w-md flex flex-col gap-4">
                <button 
                    onClick={() => handleNavigateTo('/menus')}
                    className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold rounded-md py-3 transition"
                >
                    Hacer pedido para mañana
                </button>
                <button 
                    onClick={() => handleNavigateTo('/orders')}
                    className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold rounded-md py-3 transition"
                >
                    Historial de pedidos
                </button>
                <button 
                    onClick={() => handleNavigateTo('/add-credit')}
                    className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold rounded-md py-3 transition"
                >
                    Añadir crédito ➕
                </button>
            </main>

            <footer className="mt-auto pt-6 w-full max-w-md text-center">
                <a 
                    onClick={handleLogoutClick}
                    className="cursor-pointer text-green-700 underline hover:text-green-900 transition"
                >
                    Cerrar sesión
                </a>
            </footer>
        </div>
    )
}