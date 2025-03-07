const { useState, useEffect } = React

import Posts from './components/Posts.jsx'
import CreatePost from './components/CreatePost.jsx'

import logic from '../logic.js'

function Home({ onUserLoggedOut, onProfileClick }) {
    const [view, setView] = useState('posts')
    const [username, setUsername] = useState('')

    //state that stores the targetPostId -> where comments shown
    // const [activeCommentPostId, setActiveCommentPostId] = useState(null)

    useEffect(() => {
        console.debug('Index -> useEffect')

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

export default Home