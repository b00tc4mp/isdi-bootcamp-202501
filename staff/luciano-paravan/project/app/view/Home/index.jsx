import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link} from 'react-router-dom'
import { Shirt, CircleUserRound } from 'lucide-react'

import { HomeDashboard } from './HomeDashboard'
import { AddClothingItem } from './AddClothingItem'
import { LookRequest } from './LookRequest.jsx'
import { LookSuggestion } from './LookSuggestion'
import { MyClothingItems } from './MyClothingItems'
import { MyLookSuggestions } from './MyLookSuggestions.jsx'
import { Profile } from './Profile.jsx'

import { logic } from '../../logic'
import { useContext } from '../../context.js'

export function Home({ onUserLoggedOut }) {
    const navigate = useNavigate()

    const { alert, confirm } = useContext()

    const handleHomeClick = () => navigate('/')

    const handleClothingItemAdded = () => navigate('/')

    const handleAddClothingItemCancelled = () => navigate('/')
    
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
            <Route path="/add-clothing-item" element={<AddClothingItem onAddedClothingItem={handleClothingItemAdded} onAddClothingItemCancelled={handleAddClothingItemCancelled}/>} />
            <Route path="/look-request" element={<LookRequest />} />
            <Route path="/look-suggestion" element={<LookSuggestion />} />
            <Route path="/my-clothing-items" element={<MyClothingItems />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-looks" element={<MyLookSuggestions />} />
        </Routes>

        <footer className="flex justify-center items-center fixed bottom-0 left-0 right-0 bg-[var(--bg-color)] py-[var(--padding-y)] px-[var(--padding-x) box-border gap-4">
            <div className="flex gap-4">
                <Link to="/my-clothing-items" className="flex justify-center items-center gap-3 rounded-lg border-2 border-[var(--second-color)] text-[var(--text-color)] py-2 px-4">My clothing Items <Shirt /></Link>
                <Link to="/profile" className="flex justify-center items-center gap-3 rounded-lg border-2 border-[var(--second-color)] text-[var(--text-color)] py-2 px-4">My Profile <CircleUserRound /></Link>
                <Link to="/my-looks" className="flex justify-center items-center gap-3 rounded-lg border-2 border-[var(--second-color)] text-[var(--text-color)] py-2 px-4">My looks <Shirt /></Link>
            </div>
        </footer>
    </div>
}