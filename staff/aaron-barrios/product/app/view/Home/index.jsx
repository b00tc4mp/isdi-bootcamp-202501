import {useState, useEffect} from 'react'

import {Posts} from './Posts.jsx'
import {CreatePost} from './CreatePost.jsx'

import {logic} from '../../logic/index.js'

export function Home({ onUserLoggedOut }) {
    const [view, setView] = useState('posts')
    const [username, setUsername] = useState('')

    useEffect(() => {
        try {
            const name = logic.getUsername()

            setUsername(name)
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
    const handleCreatePostClick = () => setView('create-post')

    const handlePostCreated = () => setView('posts')

    const handlePostCreateCancelled = () => setView('posts')

    return <div>
        <header style={{ width: "100%", height: "50px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: " center" }}>
            <h2>Welcome, {username}</h2>

            <button onClick={handleLogoutClick} style={{ width: "100px", height: "35px", marginRight: "10px" }} >Logout</button>
        </header >

        <main>
            {view === 'posts' && <Posts />}

            {view === 'create-post' && <CreatePost onPostCreated={handlePostCreated} onPostCreateCancelled={handlePostCreateCancelled} />}
        </main>

        {view === 'posts' && <button onClick={handleCreatePostClick}>🧉</button>}
    </div >
}