import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { Posts } from './Posts.jsx'
import { CreatePost } from './CreatePost.jsx'
import { Profile } from './Profile.jsx'
import { Search } from './Search.jsx'

import { logic } from '../../logic/index.js'

import './index.css'

export function Home ({ onUserLoggedOut }) {
    const [username, setUsername] = useState('')
    
    const navigate = useNavigate()
    const  { pathname } = useLocation() //segun la ruta en la que esté puedo obtener el pathname
    
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
    },[])

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

    const handlePostCreated = () => navigate('/')

    const handlePostCreateCancelled = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleSearchClick = () => navigate('/search')

    const handleUserClick = () => {
        try {
            const userId = logic.getUSerId()

            navigate(`/${username}`, { state: { userId } })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Home -> render')

    //const handlePostTextEdited = () => setView('posts')

    return <div className='Home'>
        <header>
            <h1 onClick={handleHomeClick}>Logo</h1>
            
            <h2 onClick={handleUserClick}>{ username }</h2>

            {pathname === '/' && <button onClick={handleSearchClick}>🔍</button>}
            
            <button type="button" onClick={handleLogoutClick}>Log out</button>
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
                {pathname === '/' && <button onClick={handleAddPostClick}>+</button>}
            </footer>
        </div>
}


//Siempre las rutas mas especificas van arriba, porque se activan por ordenes, de arriba a abajo