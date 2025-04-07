const { useState, useEffect } = React

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
        {view === 'posts' && <div>
            <h1>Logo</h1>
            <h3>Welcome, {user ? user.username : ''}</h3>
            <button onClick={handleLogoutClick}>Logout</button>
            
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