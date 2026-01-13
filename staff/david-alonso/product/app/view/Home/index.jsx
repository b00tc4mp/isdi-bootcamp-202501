import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { Posts } from './Posts.jsx'
import { CreatePost } from './CreatePost.jsx'
import { Profile } from './Profile.jsx'
import { Search } from './Search.jsx'

import { logic } from '../../logic/index.js'
import { useContext } from '../../context'

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

    const handleAddPostClick = () => navigate('/create-post')

    const handlePostCreated = () => navigate('/')

    const handlePostCreateCancelled = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleSearchClick = () => navigate('/search')

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

    return <div className="home">

        <header>

            <img onClick={handleHomeClick} src="./view/images/Logo X.jpg" className="logoHome" />

            <div onClick={handleUserClick} className='profile'>
                <h3 className="user">{username}</h3>
            </div>
        </header>


        <main>
            <Routes>
                <Route path="/create-post" element={<CreatePost onPostCreated={handlePostCreated} onPostCreateCancelled={handlePostCreateCancelled} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:username" element={<Profile />} />
                <Route path="/" element={<Posts />} />
            </Routes>
        </main>


        <footer className="footer">
            <img src="./view/images/NV.jpg" className="nvLogo" />

            {pathname === '/' && <button onClick={handleSearchClick} className='search'>🔍</button>}

            {pathname === '/' && <button onClick={handleAddPostClick} className="new">NEW</button>}

            <button type="button" onClick={handleLogoutClick} className="logout">EXIT</button>
        </footer>

    </div >
}