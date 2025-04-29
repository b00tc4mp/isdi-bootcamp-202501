import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link} from 'react-router-dom'

import { HomeDashboard } from './HomeDashboard'
import { AddClothingItem } from './AddClothingItem'
import { RequestLook } from './RequestLook'
import { LookSuggestion } from './LookSuggestion'
import { MyClothingItems } from './MyClothingItems'
import { Profile } from './Profile.jsx'

import { logic } from '../../logic'
import { useContext } from '../../context.js'

export function Home({ onUserLoggedOut }) {
    const navigate = useNavigate()

    const { alert, confirm } = useContext()

    const handleHomeClick = () => navigate('/')
    
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

    return <div>
        <header className="flex justify-between items-center fixed top-0 w-full bg-[var(--bg-color)] py-[var(--padding-y)] px-[var(--padding-x)] box-border">
            <h1 className="text-2xl" onClick={handleHomeClick}>myLook<span className={`text-[var(--fourth-color)]`}>AI</span></h1>
            <button onClick={handleLogoutClick} className="btn-primary m-4 p-4">Logout</button>
        </header>
        <Routes>
            <Route path="/" element={<HomeDashboard onUserLoggedOut={onUserLoggedOut} />} />
            <Route path="/add-clothing-item" element={<AddClothingItem />} />
            <Route path="/request-look" element={<RequestLook />} />
            <Route path="/look-suggestion" element={<LookSuggestion />} />
            <Route path="/my-clothing-items" element={<MyClothingItems />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>

        <footer className="flex justify-center items-center fixed bottom-0 left-0 right-0 bg-[var(--bg-color)] py-[var(--padding-y)] px-[var(--padding-x) box-border gap-4">
            <div className="flex gap-4">
                <Link to="/my-clothing-items" className="rounded-md border border-[var(--fourth-color)] text-[var(--first-color)] py-2 px-4">My clothing Items 🧥</Link>
                <Link to="/profile" className="rounded-md border border-[var(--fourth-color)] text-[var(--first-color)] py-2 px-4">My Profile 👤</Link>
            </div>
        </footer>
    </div>
}