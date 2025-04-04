import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { Posts } from './Posts.jsx'
import { CreatePost } from './CreatePost.jsx'
import { Profile } from './Profile.jsx'
import { Search } from './Search.jsx'


import { logic } from '../../logic/index.js'

export function Homepage ({ onUserLoggedOut }) {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const { pathname } = useLocation


    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            logic.getUsername()
                .then(username =>  setUsername(username))
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

    const handleCreatePostClick = () => navigate('create-post')

    const handlePostCreated = () => navigate('/')

    const handlePostCreateCancelled = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleSearchClick = () => navigate('/search')

    const handleUserClick = () => {
        try {
            const UserId = logic.getUserId()

            navigate(`${username}`, { state: { userId } })
        } catch(error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Home -> render')

    return <div className="Homepage">
        <header>
            <img src="doc\images\logo-bee-you.png" alt="Bee logo" className="bee-logo" onClick={handleHomeClick}/>
            
            <h2 onClick={handleUserClick}>{username}</h2>

            {pathname === '/' && <button onClick={handleSearchClick}>🔍</button>}

            <a onClick={handleLogoutClick}>Logout</a> 
        </header>
        <main>
            <Routes>
                <Route path="/create-post" element={<CreatePost onPostCreated={handlePostCreated} onPostCreateCancelled={handlePostCreateCancelled} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:username" element={<Profile />} /> 
                <Route path="/" element={<Posts />} />
            </Routes>
        </main>
        <footer>
            {pathname === '/' && <button onClick={handleCreatePostClick}>+</button>}
        </footer>
    </div>
}
