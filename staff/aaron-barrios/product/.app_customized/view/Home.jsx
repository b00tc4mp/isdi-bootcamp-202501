const { useState, useEffect } = React

function Home({ onLogoutClick }) {
    const [view, setView] = useState('posts')
    const [username, setUsername] = useState('')
    const [posts, setPosts] = useState([])

    //state that stores the targetPostId -> where comments shown
    const [activeCommentPostId, setActiveCommentPostId] = useState(null)


    useEffect(() => {
        console.debug('Home -> useEffect')

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

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            logic.createPost(image, text)

            form.reset()

            const updatedPosts = logic.getPosts()

            setPosts(updatedPosts)
            setView('posts')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCreatePostClick = () => { setView('create-post') }

    const handleCancelCreateClick = () => { setView('posts') }

    const handleLikeButtonClick = postId => {
        try {
            logic.toggleLikePost(postId)

            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error)
        }
    }


    const commentButtonClick = postId => { setActiveCommentPostId(currentId => currentId === postId ? null : postId) }

    console.debug('Home -> render')

    return <div>
        <header style={{ width: "100%", height: "50px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: " center" }}>
            <h2>Welcome, {username}</h2>

            <button onClick={handleLogoutClick} style={{ width: "100px", height: "35px", marginRight: "10px" }} >Logout</button>
        </header >

        {/* --- POSTS SECTION ---     */}
        {(posts && view === 'posts') && <main>
            <section>
                {posts.map(post => (
                    <article style={{ marginTop: '20px', marginBottom: '50px' }}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: "5px", height: '20px' }}>
                            <h3>{post.author}</h3>
                            <time>{post.createdAt.toISOString()}</time>
                        </span>

                        <img src={post.image} />

                        <span style={{ display: 'flex', justifyContent: "left", alignItems: 'center', gap: "5px", height: '20px' }}>
                            <p>{post.text}</p>
                            <button type="button"
                                onClick={() => handleLikeButtonClick(post.id)} >{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>
                            <h5>{post.likes}</h5>
                            <button type="button" onClick={() => commentButtonClick(post.id)}>📃</button>
                        </span>

                        {/* --- COMMENTS SECTION ---     */}
                        {activeCommentPostId === post.id && <section>
                            <article style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <span style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: "5px", height: '20px' }}>
                                    <h3>Eugeni</h3>
                                    <time>3d</time>
                                </span>

                                <span style={{ display: 'flex', justifyContent: "left", alignItems: 'center', gap: "5px", height: '20px' }}>
                                    <p>Vinga Bouuuuusss! </p>
                                    <button type="button">❤️</button>
                                    <h5>14</h5>
                                </span>
                            </article>

                            <article style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <span style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: "5px", height: '20px' }}>
                                    <h3>Lucho</h3>
                                    <time>3d</time>
                                </span>

                                <span style={{ display: 'flex', justifyContent: "left", alignItems: 'center', gap: "5px", height: '20px' }}>
                                    <p>Alto alzado...</p>
                                    <button type="button">❤️</button>
                                    <h5>8</h5>
                                </span>
                            </article>

                            <label htmlFor="comment">Wanna comment?</label>
                            <br />
                            <input type="text" id="comment" />
                        </section>}

                    </article>
                ))}
            </section>
        </main>}


        {/* --- CREATE POST SECTION ---     */}
        {view === 'create-post' && <section>
            <h2>Create Post</h2>

            <form onSubmit={handleCreatePostSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "left", gap: "5px" }}>
                <label htmlFor="image">Image</label>
                <input type="url" id="image" style={{ width: "350px" }} />
                <label htmlFor="text">Text</label>
                <input type="text" id="text" style={{ width: "350px" }} />

                <button type="submit" style={{ width: "80px" }}>Create</button>
            </form>

            <a onClick={handleCancelCreateClick}>Cancel</a>
        </section>}

        {view === 'posts' && <button type="button" onClick={handleCreatePostClick}>🧉</button>}
    </div >
}