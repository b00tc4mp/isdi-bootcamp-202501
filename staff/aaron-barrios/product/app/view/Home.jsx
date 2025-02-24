const { useState, useEffect } = React

function Home({ onLogoutClick }) {
    const [view, setView] = useState('posts')
    const [username, setUsername] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            const username = logic.getUsername()
            const posts = logic.getPosts()

            setUsername(username)
            setPosts(posts)
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
    const handleCreatePostClick = () => setView('create-post')

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text }
            } = form

            logic.createPost(image, text)

            const posts = logic.getPosts()

            setPosts(posts)
            setView('posts')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleToggleLikePostClick = postId => {
        try {
            logic.toggleLikePost(postId)

            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <div>
        <header style={{ width: "100%", height: "50px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: " center" }}>
            <h2>Welcome, {username}</h2>

            <button onClick={handleLogoutClick} style={{ width: "100px", height: "35px", marginRight: "10px" }} >Logout</button>
        </header >

        {view === 'posts' && <main>
            <section>
                {posts.map(post =>
                    <article>
                        <h3>{post.author}</h3>

                        <img src={post.image} />

                        <p>{post.text}</p>

                        <time>{post.createdAt.toISOString()}</time>

                        <button onClick={() => handleToggleLikePostClick(post.id)}>{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>
                    </article>
                )}
            </section>
        </main>}

        {view === 'create-post' && <section>
            <h2>Create Post</h2>

            <form onSubmit={handleCreatePostSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "left", gap: "5px" }}>
                <label htmlFor="image">Image</label>
                <input type="url" id="image" style={{ width: "350px" }} />
                <label htmlFor="text">Text</label>
                <input type="text" id="text" style={{ width: "350px" }} />

                <button type="submit" style={{ width: "80px" }}>Create</button>
            </form>

            <a>Cancel</a>
        </section>}

        {view === 'posts' && <button onClick={handleCreatePostClick}>🧉</button>}
    </div >
}