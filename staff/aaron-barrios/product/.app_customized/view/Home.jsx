const { useState, useEffect } = React

import Posts from './components/Posts.jsx'
import CreatePost from './components/CreatePost.jsx'

import logic from '../logic.js'

function Home({ onLogoutClick, onProfileClick }) {
    const [view, setView] = useState('posts')
    const [username, setUsername] = useState('')

    //state that stores the targetPostId -> where comments shown
    // const [activeCommentPostId, setActiveCommentPostId] = useState(null)


    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            const username = logic.getUsername()

            setUsername(username)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogoutClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleProfileClick = () => {
        try {
            onProfileClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCreatePostClick = () => setView('create-post')

    const handleCreatePostSubmit = () => setView('posts')

    const handleCancelCreateClick = () => setView('posts')

    const handleHomeClick = () => setView('posts')


    // const commentButtonClick = postId => { setActiveCommentPostId(currentId => currentId === postId ? null : postId) }

    console.debug('Home -> render')

    return <div >
        {view === 'posts' && <header>
            <h2>Welcome, {username}</h2>

            <button onClick={handleProfileClick}>🥸</button>

            <button onClick={handleLogoutClick}>Logout</button>
        </header >}

        <main>
            {view === 'posts' && <Posts />}
            {view === 'create-post' && <CreatePost onPostCreateSubmit={handleCreatePostSubmit} onCreatePostCancel={handleCancelCreateClick} />}
            {view === 'profile' && <Profile onHomeClick={handleHomeClick} />}
        </main>

        <footer>
            {view === 'posts' && <button onClick={handleCreatePostClick}>🧉</button>}
        </footer>
    </div >
}

export default Home