import { useState, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router'

import { Posts } from './Posts.jsx'
import { CreatePost } from './CreatePost.jsx'
import { Profile } from './Profile.jsx'
import { Search } from './Search.jsx'

import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'

import { errors } from 'com'

const { SystemError, ValidationError } = errors

export function Home({ onUserLoggedOut }) {
    const [username, setUsername] = useState('')

    const {alert, confirm} = useContext()

    const navigate = useNavigate()
    const { pathname } = useLocation() // => variable to extract the pathname for the Searcher

    useEffect(() => {
        console.debug('Index -> useEffect')

        try {
            logic.getUserUsername()
                .then(username => setUsername(username))
                //ERRORES ASÍNCRONOS
                .catch(error => {
                    console.error(error)

                    if (error instanceof SystemError)
                        alert('⛔ ' + error.message)
                    else
                        alert('⚠️ ' + error.message)
                })
            //ERRORES SÍNCRONOS
        } catch (error) {
            console.error(error)

            if (error instanceof ValidationError)
                alert('❌ ' + error.message)
            else
                alert('⛔ ' + error.message)
        }
    }, [])

    const handleLogoutClick = () => {
        confirm('Logout?')
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

    const handlePostCreated = () => navigate('/')

    const handlePostCreateCancelled = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleSearchClick = () => navigate('/search')

    const handleProfileClick = () => {
        try {
            const userId = logic.getUserId()

            navigate(`/${username}`, { state: { userId } })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    console.debug('Index -> render')

    return <div >
        <header>
            <h1 onClick={handleHomeClick}>Social App</h1>

            <h2 onClick={handleProfileClick}>{username}</h2>

            {pathname === '/' && <button onClick={handleSearchClick}>🔍</button>}

            <button onClick={handleLogoutClick}>Logout</button>
        </header >

        <main>
            <Routes>
                <Route path="/create-post" element={<CreatePost onPostCreated={handlePostCreated} onPostCreateCancelled={handlePostCreateCancelled} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:username" element={<Profile />} />
                <Route path="/" element={<Posts />} />
            </Routes>
        </main>

        <footer>
            {pathname === '/' && <button onClick={handleCreatePostClick}>🧉</button>}
        </footer>
    </div >
}