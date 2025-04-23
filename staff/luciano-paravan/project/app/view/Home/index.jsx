import { Routes, Route, useLocation, useNavigate} from 'react-router-dom'

import { HomeDashboard } from './HomeDashboard'
import { AddClothingItem } from './AddClothingItem'
import { RequestLook } from './RequestLook'
import { LookSuggestion } from './LookSuggestion'

export function Home({onUserLoggedOut}) {

    const navigate = useNavigate()

    const handleHomeClick = () => navigate('/')
    const handleLogoutClick = ()=> onUserLoggedOut()

    return <div>
        <header className="flex justify-between items-center fixed top-0 w-full bg-[var(--secondary-color)] py-[var(--padding-y)] px-[var(--padding-x)] box-border">
            <h1 className="text-2xl" onClick={handleHomeClick}>myLookAI</h1>
            <button onClick={handleLogoutClick} className="btn-primary m-4 p-4">Logout</button>
        </header>
        <Routes>
            <Route path="/" element={<HomeDashboard onUserLoggedOut={onUserLoggedOut} />} />
            <Route path="/add-clothing-item" element={<AddClothingItem />} />
            <Route path="/request-look" element={<RequestLook />} />
            <Route path="/look-suggestion" element={<LookSuggestion />} />
        </Routes>

        <footer className="flex justify-center items-center fixed bottom-0 w-full bg-[var(--seconday-color) py-[var(--padding-y)] px-[var(--padding-x) box-border]">
            <span>footer info</span>
        </footer>
    </div>
}