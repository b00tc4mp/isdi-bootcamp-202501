import { useState, useEffect } from 'react'

import logic from '../logic.js'
import Logo from './components/Logo.jsx'
import PostList from './components/PostList.jsx'
import CreatePost from './components/CreatePost.jsx'

function Home({onUserLoggedOut}) {
    const [view, setView] = useState('posts')
    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            const currentUser = logic.getCurrentUser()

            setUser(currentUser)
        } catch (error) {
            logic.helper.handleError(error)
        }
    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handleCreatePostClick = () => setView('create-post')

    const handleCreatePostCancelled = () => setView('posts')
    
    const handlePostCreated = () => setView('posts')

    return <>
        {view === 'posts' && <div id="home">
            <header>
                <h3>Welcome, {user ? user.username : ''}</h3>
                <Logo />
                <button onClick={handleLogoutClick}>Logout</button>
            </header>
            <PostList />
            </div>}
            
        {view === 'create-post' && <CreatePost onCreatePostCancelled={handleCreatePostCancelled} onPostCreated={handlePostCreated} />}

        {view === 'posts' && <footer id='add-post-footer'>
            <button id='add-post-button' onClick={handleCreatePostClick}>+</button>
        </footer>}
        </>
}

export default Home