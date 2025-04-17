import { useState, useEffect } from 'react'
import { logic } from '../logic'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { useContext } from '../context'

import { Ranking } from '../view/Ranking'
import { Levels } from '../view/Levels'
import { Profile } from '../view/Profile'

// TODO logic.logoutUser()

export function Home({ onNavigateToProfile, onUserLoggedOut }) {
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

    // const handleLevelClick = () => {
    //     try {
    //         const levelId = logic.getLevelId()

    //         //TODO change the path name

    //         navigate(`${levelId}`, { state: { levelId } })
    //     } catch (error) {
    //         console.error(error)

    //         alert(error.message)
    //     }
    // }

    const handleUsernameClick = () => navigate('/profile')

    return <>
        <header>
            <p>Logo</p>
            <p onClick={handleUsernameClick}>Hello, {username}!</p>
        </header>

        <main>
            <Routes>
                <Route path="/" element={<><Ranking /> <Levels /></>} />
                <Route path="/profile" element={<Profile onUserLoggedOut={onUserLoggedOut} />} />


            </Routes>
        </main>

    </>

}