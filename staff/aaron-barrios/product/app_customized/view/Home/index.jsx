import { useState, useEffect } from 'react'

import { Posts } from './Posts.jsx'
import { CreatePost } from './CreatePost.jsx'

import { logic } from '../../logic/index.js'

export function Home({ onUserLoggedOut, onProfileClick }) {
    const [view, setView] = useState('posts')
    const [username, setUsername] = useState('')

    useEffect(() => {
        console.debug('Index -> useEffect')

        try {
            logic.getUsername()
                .then(name => setUsername(name))
                //ERRORES ASÍNCRONOS
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
            //ERRORES SÍNCRONOS
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

    const handleCurrentUserClick = () => {
        try {
            logic.getCurrentUser()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleProfileClick = () => onProfileClick()

    const handleCreatePostClick = () => setView('create-post')

    const handlePostCreated = () => setView('posts')

    const handlePostCreateCancelled = () => setView('posts')

    const handleHomeClick = () => setView('posts')

    // const commentButtonClick = postId => { setActiveCommentPostId(currentId => currentId === postId ? null : postId) }

    console.debug('Index -> render')

    return <div >
        {view === 'posts' && <header>
            <h2>Welcome, {username}</h2>

            <button onClick={handleProfileClick}>🥸</button>

            <button onClick={handleCurrentUserClick}>🫵</button>

            <button onClick={handleLogoutClick}>Logout</button>
        </header >}

        <main>
            {view === 'posts' && <Posts />}

            {view === 'create-post' && <CreatePost onPostCreated={handlePostCreated} onPostCreateCancelled={handlePostCreateCancelled} />}

            {view === 'profile' && <Profile onHomeClick={handleHomeClick} />}
        </main>

        <footer>
            {view === 'posts' && <button onClick={handleCreatePostClick}>🧉</button>}
        </footer>
    </div >
}