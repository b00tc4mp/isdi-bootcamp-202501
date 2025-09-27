import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Sparkles, Plus } from 'lucide-react'

export function HomeDashboard() {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleAddClothingItem = () => navigate('/add-clothing-item')
    const handleLookRequest = () => navigate('/look-request')

    return <div className='h-screen'>

    {pathname === '/' && <div className="flex flex-col justify-center h-full ">
        <Link to={'/add-clothing-item'} onClick={handleAddClothingItem} className="btn-link flex items-center justify-center gap-4">Add Clothing Item <Plus /></Link>
        <Link to={'/look-request'} onClick={handleLookRequest} className="btn-link flex items-center justify-center gap-4">Look Request <Sparkles /></Link>
    </div>}

    </div>
}