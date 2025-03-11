const { useState, useEffect } = React

import logic from '../logic.js'

import Logo from './Logo.jsx'
import Post from './Post.jsx'
import CreatePost from './CreatePost.jsx'

function Home({onLogoutClick}) {
    const [view, setView] = useState('posts')
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            const currentUser = logic.getCurrentUser()
            const posts = logic.getPosts()

            setUser(currentUser)
            setPosts(posts)
        } catch (error) {
            logic.helper.handleError(error)
        }
    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogoutClick()
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handleCreatePostClick = () => setView('create-post')

    const handleCancelClick = () => setView('posts')
    
    const handleCreatePostSubmit = () => setView('posts')

    const handleReloadPosts = () => {
        const posts = logic.getPosts()
            
        setPosts(posts)
    }

    return <>
        {view === 'posts' && <div id="home">
            <header>
                <h3>Welcome, {user ? user.username : ''}</h3>
                <Logo />
                <button onClick={handleLogoutClick}>Logout</button>
            </header>
            
            <section id="posts-section">
                {posts.toReversed().map(post => <Post key={post.id} post={post} reloadPosts={handleReloadPosts}/>)}
            </section>
            <footer id='add-post-footer'>
                <button id='add-post-button' onClick={handleCreatePostClick}>+</button>
            </footer>
        </div>}
            
        {view === 'create-post' && <CreatePost onCancelClick = {handleCancelClick} onCreatePostSubmit = {handleCreatePostSubmit} reloadPosts={handleReloadPosts}/>}
        </>
}

export default Home