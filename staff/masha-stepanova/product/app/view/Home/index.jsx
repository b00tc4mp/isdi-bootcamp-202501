import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { logic } from '../../logic/index.js'

import { Profile } from '../custom/Profile.jsx'
import { Posts } from './components/Posts.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { Search } from './components/Search.jsx'

import { useContext } from '../../context.js'

export function Home({ onUserLoggedOut }) {
    const { alert, confirm } = useContext()

    const [username, setUsername] = useState('')

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        console.debug('Home -> useEffect')

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
        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostClick = () => navigate('/create-post')

    const handleCreatedPost = () => navigate('/')

    // const handleNavigateToProfile = () => onNavigateToProfile()

    const handleCreatePostCanceled = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleSearchClick = () => navigate('/search')

    const handleCancelSearchClick = () => navigate('/')

    const handleUserClick = () => {
        try {
            const userId = logic.getUserId()

            navigate(`/${username}`, { state: { userId } })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Home -> render')

    return <div className="posts">

        <section className="header">
            <button onClick={handleLogoutClick}>Logout</button>

            <h1 onClick={handleHomeClick}>Foodies</h1>

            <h2 onClick={handleUserClick}>{username}</h2>

            {pathname === '/' && <button type="button" onClick={handleSearchClick}>🔍</button>}
        </section>

        <main>

            <Routes>
                <Route path="/create-post" element={<CreatePost onCreatedPost={handleCreatedPost} onCreatePostCanceled={handleCreatePostCanceled} />} />
                <Route path="/search" element={<Search onCancelClick={handleCancelSearchClick} />} />
                <Route path="/:username" element={<Profile />} />
                <Route path="/" element={<Posts />} />
            </Routes>
        </main>

        <footer>
            {pathname === '/' && <button onClick={handleAddPostClick}>➕</button>}
        </footer>

    </div >
}