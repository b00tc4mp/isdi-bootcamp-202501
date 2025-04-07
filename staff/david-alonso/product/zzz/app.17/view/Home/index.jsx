import { useState, useEffect } from 'react'

import { Posts } from './Posts.jsx'
import { CreatePost } from './CreatePost.jsx'

import { logic } from '../../logic/index.js'

export function Home({ onUserLoggedOut }) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            const name = logic.getUserName()

            setUserName(name)
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

    const handleAddPostClick = () => setView('create-post')

    const handlePostCreated = () => setView('posts')

    const handlePostCreateCancelled = () => setView('posts')

    console.debug('Home -> render')

    return <div className="home">

        <header>
            <img src="./view/images/home.jpg" className="logoHome" />

            <h3 className="user">{userName}</h3>

            <button type="button" onClick={handleLogoutClick} className="logout">EXIT</button>
        </header>


        <main>
            {view === 'posts' && <Posts />}

            {view === 'create-post' && <CreatePost onPostCreated={handlePostCreated}
                onPostCreateCancelled={handlePostCreateCancelled} />}
        </main>


        <footer className="footer">
            <img src="./view/images/NV.jpg" className="nvLogo" />

            {view === 'posts' && <button onClick={handleAddPostClick} className="new">NEW</button>}
        </footer>

    </div >
}