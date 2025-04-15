import { useState, useEffect } from 'react'
import { Ranking } from './Ranking'
import { useContext } from '../context'

import { logic } from '../logic'

export function Profile({ onUserLoggedOut }) {
    const { alert, confirm } = useContext()
    const [view, setView] = useState('')

    useEffect(() => {
        try {
            setView('general')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        {view === 'general' && <Ranking /> &&
            <footer>
                <a onClick={handleLogoutClick}>Logout</a>
            </footer>}
    </>
}