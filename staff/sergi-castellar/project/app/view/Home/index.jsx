import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { Calendar } from './Calendar'
import { Diary } from './Diary'
import { Feelings } from './Feelings'
import { FunctionSelect } from './FunctionSelect'
import { Lists } from './Lists'

import { logic } from '../../logic'

export function Home({ onUserLoggedOut }) {
    const navigate = useNavigate()

    

    const handleLogoutClick = () => {
        const accepted = confirm('Do you want to logout?')
            if (accepted)
                try {
                    logic.logoutUser()

                    onUserLoggedOut()
                } catch (error) {
                    console.error(error)

                    alert(error.message)
                }
    }

    const handleCalendarClick = () => {
        navigate('/calendar')
    }

    const handleListsClick = () => {
        navigate('/lists')
    }

    const handleDiaryClick = () => {
        navigate('/diary')
    }

    const handleFeelingsClick = () => {
        navigate('/feelings')
    }

    return <>
        <button type="button" onClick={handleLogoutClick}>Logout</button>
        <img className="w-16" src="../assets/asset_no_border_logo.png" alt="CoupleApp logo" />

        <Routes>
            <Route path="/home" element={<FunctionSelect onCalendarClick={handleCalendarClick} onListsClick={handleListsClick} onDiaryClick={handleDiaryClick} onFeelingsClick={handleFeelingsClick} />} />
            
            <Route path="/calendar" element={<Calendar />} />

            <Route path="/lists" element={<Lists />} />

            <Route path="/diary" element={<Diary />} />

            <Route path="/feelings" element={<Feelings />} />
        </Routes> 
    </>
}