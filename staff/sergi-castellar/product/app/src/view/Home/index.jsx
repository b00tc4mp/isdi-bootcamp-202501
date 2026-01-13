import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { PostList } from '../components/PostList'
import { CreatePost } from '../components/CreatePost'
import { Profile } from '../components/Profile'
import { Search } from '../components/Search'
import { Logo } from '../components/Logo'
import { useContext } from '../../context'
import { logic } from '../../logic'

export function Home({onUserLoggedOut}) {
    const { alert, confirm } = useContext()

    const [user, setUser] = useState(null)

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        try {
            logic.getCurrentUser()
                .then(currentUser => setUser(currentUser))
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
        confirm('Do you want to logout?')
        .then(accepted => {
            if (accepted) {
                try {
                    logic.logoutUser()
        
                    onUserLoggedOut()
                } catch (error) {
                    console.error(error)
                    alert(error.message)
                }
            }
        })
    }

    const handleCreatePostClick = () => navigate('/create-post')

    const handleCreatePostCancelled = () => navigate('/')
    
    const handlePostCreated = () => navigate('/')

    const handleSearchClick = () => navigate('/search')

    const handleUserClick = () => {
        try {
            const userId = logic.getUserId()

            navigate(`/${user.username}`, { state: {userId}})
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return <div id="home">
            <header>
                <h3 onClick={handleUserClick}>{user ? user.username : ''}</h3>

                <Logo />

                {pathname === '/' && <button onClick={handleSearchClick}>🔍</button>}

                <button onClick={handleLogoutClick}>Logout</button>
            </header>

            <main>
                <Routes>
                    <Route path="/create-post" element={<CreatePost onPostCreated={handlePostCreated} onCreatePostCancelled={handleCreatePostCancelled} />} />

                    <Route path="/search" element={<Search />} />

                    <Route path="/:username" element={<Profile />} />

                    <Route path="/" element={<PostList />} />
                </Routes>
            </main>
            
        <footer className='add-post-footer'>
            {pathname === '/' && <button className='add-post-button' onClick={handleCreatePostClick}>+</button>}
        </footer>
        </div>
}