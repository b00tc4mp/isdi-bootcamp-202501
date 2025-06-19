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
        <div className="home-container">
            <header>
                <div className="logo">Logo</div>

                <h1>¡Hola {userName}! 👋🏽</h1>

                {credit !== null && (
                    <p>Crédito disponible: {credit.toFixed(2)} €</p>
                )}
            </header>

            <main>
                <button onClick={() => handleNavigateTo('/menus')}>Hacer pedido para mañana</button>
                <button onClick={() => handleNavigateTo('/orders')}>Historial de pedidos</button>
                <button onClick={() => handleNavigateTo('/add-credit')}>Añadir crédito ➕</button>
            </main>

            <footer>
                <a onClick={handleLogoutClick}>Cerrar sesión</a>
            </footer>
        </div>
    )
}

