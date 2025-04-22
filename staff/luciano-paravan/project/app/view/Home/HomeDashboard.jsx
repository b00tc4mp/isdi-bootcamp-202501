import { useNavigate, useLocation } from 'react-router-dom'

export function HomeDashboard({ onUserLoggedOut }) {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleAddClothingItem = navigate('/add-clothing-item')
    const handleLookRequest = navigate('/request-look')

    return <div className='h-screen'>

    {pathname === '/' && <div className="flex flex-col justify-center h-full ">
        <a onClick={handleAddClothingItem} className="btn-link">Add Clothing Item</a>
        <a onClick={handleLookRequest} className="btn-link">Look Request</a>
    </div>}

    </div>
}