import { Routes, Route, useNavigate } from 'react-router'

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
        <div className="bg-pink-100  flex flex-col items-center justify-center">
            <button type="button" onClick={handleLogoutClick}>Logout</button>
            <div className="w-full flex justify-center py-6">
                <img className="w-32 h-auto" src="../assets/asset_no_border_logo.png" alt="CoupleApp logo" />
            </div>
        </div>


        <Routes>
            <Route path="/home" element={<FunctionSelect onCalendarClick={handleCalendarClick} onListsClick={handleListsClick} onDiaryClick={handleDiaryClick} onFeelingsClick={handleFeelingsClick} />} />
            
            <Route path="/calendar" element={<Calendar />} />

            <Route path="/lists" element={<Lists />} />

            <Route path="/diary" element={<Diary />} />

            <Route path="/feelings" element={<Feelings />} />
        </Routes> 
    </>
}