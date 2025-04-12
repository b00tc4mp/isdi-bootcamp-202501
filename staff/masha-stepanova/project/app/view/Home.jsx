import { useState, useEffect } from 'react'
import { logic } from '../logic'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { useContext } from '../context'

export function Home(onNavigateToProfile, onUserLoggedOut) {
    const { alert } = useContext()

    const [username, setUsername] = useState('')

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        try {
            logic.getUserUsername()
                .then(username => setUsername(username))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    return <>
        <p>Hello, {username}!</p>
    </>

}