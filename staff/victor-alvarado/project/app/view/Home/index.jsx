import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { Recipes } from './Recipes';
import { CreateRecipe } from './CreateRecipe'
import { Profile } from './Profile'


import { logic } from '../../logic'
import { useContext } from '../../context';


export function Home({ onUserLoggedOut }) {
    const { alert, confirm } = useContext()

    const [username, setUsername] = useState('')

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        console.debug('Home -> useEfect')

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

    const handleLogoutClick = () => {
        confirm('Logout?')
            .then(accepted => {
                if (accepted)
                    try {
                        logic.logoutUser()

                        onUserLoggedOut()
                    } catch (error) {
                        console.error(error)

                        alert(error.message)
                    }

            })
    }

    const handleAddRecipeClick = () => navigate('/create-recipe')

    const handleRecipeCreated = () => navigate('/')

    const handleRecipeCreateCancelled = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleUserClick = () => {
        try {
            const userId = logic.getUserId()

            navigate(`/${username}`, { state: { userId } })
        } catch (error) {

            alert(error.message)
        }
    }

    console.debug('Home -> render')

    return <div>

        <header className="flex justify-between items-center fixed top-0 w-full bg-[var(--secondary-color)] py-[var(--padding-y)] px-[var(--padding-x)] box-border">
            <h1 className="text-2xl" onClick={handleHomeClick}>Logo</h1>

            <h2 onClick={handleUserClick}>{username}</h2>

            <button type="button" onClick={handleLogoutClick}>Logout</button>
        </header>

        <main className="pt-[70px] pb-[60px]">
            <Routes>
                <Route path="/create-recipe" element={<CreateRecipe onRecipeCreated={handleRecipeCreated} onRecipeCreateCancelled={handleRecipeCreateCancelled} />} />
                <Route path="/:username" element={<Profile />} />
                <Route path="/" element={<Recipes />} />
            </Routes>
        </main>

        <footer className="flex justify-center items-center fixed bottom-0 w-full bg-[var(--secondary-color)] py-[var(--padding-y)] px-[var(--padding-x)] box-border">
            {pathname === '/' && <button onClick={handleAddRecipeClick}>+</button>}
        </footer>
    </div>
}


