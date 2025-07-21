import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { Posts } from './Posts'
import { CreatePost } from './CreatePost'
import { Profile } from './Profile'
import { Search } from './Search'

import { logic } from '../../logic/index'
import { useContext } from '../../context'

export function Homepage ({ onUserLoggedOut }) {
    const { alert, confirm } = useContext()

    const [username, setUsername] = useState('')

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            logic.getUserUsername()
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
        confirm('Logout?')
            .then(accepted => {
                if(accepted)
                    try {
                        logic.logoutUser()
            
                        onUserLoggedOut()
                        
                    } catch (error) {
                        console.error(error)
            
                        alert(error.message)   
                    }
            })
    }

    const handleCreatePostClick = () => navigate('/create-post')

    const handlePostCreated = () => navigate('/')

    const handlePostCreateCancelled = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleSearchClick = () => navigate('/search')

    const handleUserClick = () => {
        try {
            const userId = logic.getUserId()

            navigate(`${username}`, { state: { userId } })
        } catch(error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Home -> render')

    return <div>
        <header className="bg-[var(--primary-color)] flex justify-between items-center w-full py-[var(--padding-y)] px-[var(--padding-x)] box-border">
            <img src="doc\images\logo-bee-you.png" alt="Bee logo" className="bee-logo-register-login" onClick={handleHomeClick}/>
            
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
        <footer className="bg-[var(--primary-color)] fixed w-full bottom-0 items-center flex justify-center py-[var(--padding-y)] px-[var(--padding-x)] box-border">
            {pathname === '/' && <button onClick={handleCreatePostClick}>+</button>}
        </footer>
    </div>
}
