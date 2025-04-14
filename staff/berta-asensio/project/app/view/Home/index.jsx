import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { Menus } from './Menus'
import { Orders } from './Orders'
import { logic } from '../../logic/index'

export function Home({ onUserLoggedOut }) {
    const[userName, setUserName] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        try {
            logic.getUserName()
                .then(name => setUserName(name))
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
        //aqui falta CONFIRM
        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch(error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleNavigateToMenu = () => {
        navigate('/menus')
    }

    const handleNavigateToOrders = () => {
        navigate('/orders')
    }
    

    console.debug('Home page renderized')

    return <div className="home-container">
        <header>
            <div className="logo">Logo</div>

            <h1>Welcome {userName}! 👋🏽</h1>

            <button onClick={handleNavigateToMenu}>See Menu</button>

            <button onClick={handleNavigateToOrders}>My Orders</button>

            <a onClick={handleLogoutClick}>Logout</a>
        </header>
        <main>
            <Routes>
                <Route path="/menus" element={<Menus />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </main>
        </div>
}

