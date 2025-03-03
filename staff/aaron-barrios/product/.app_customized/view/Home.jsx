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

    return <div >
        {view === 'posts' && <header>
            <h2>Welcome, {username}</h2>

            <button onClick={handleLogoutClick}>Logout</button>
        </header >}

        <main>
            {/* --- POSTS SECTION ---     */}
            {view === 'posts' && <section>
                {posts.map(post => (
                    <article>
                        <div className="post-header">
                            <h3>{post.author}</h3>
                            <time>{post.createdAt.toISOString()}</time>
                        </div>
                        <img src={post.image} />

                        <div className="post-footer">
                            <p>{post.text}</p>
                            <button type="button"
                                onClick={() => handleLikeButtonClick(post.id)} >{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>
                            <h5>{post.likes}</h5>
                            <button type="button" onClick={() => commentButtonClick(post.id)}>📃</button>
                        </div>

                        {/* --- COMMENTS SECTION ---     */}
                        {activeCommentPostId === post.id && <section>
                            <article >
                                <span>
                                    <h3>Eugeni</h3>
                                    <time>3d</time>
                                </span>

                                <span >
                                    <p>Vinga Bouuuuusss! </p>
                                    <button type="button">❤️</button>
                                    <h5>14</h5>
                                </span>
                            </article>

                            <article>
                                <span >
                                    <h3>Lucho</h3>
                                    <time>3d</time>
                                </span>

                                <span >
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
            </section>}


            {/* --- CREATE POST SECTION ---     */}
            {view === 'create-post' && <section className="create-post">
                <h2 style={{ marginBottom: '1rem' }}>Create Post</h2>

                <form onSubmit={handleCreatePostSubmit} >

                    <div className="field">
                        <label htmlFor="image">Image</label>
                        <input type="url" id="image" />
                    </div>

                    <div className="field">
                        <label htmlFor="text">Text</label>
                        <input type="text" id="text" />
                    </div>

                    <button type="submit">Create</button>
                </form>

                <a onClick={handleCancelCreateClick}>Cancel</a>
            </section>}

        </main>

        <footer>
            {view === 'posts' && <button onClick={handleCreatePostClick}>🧉</button>}
        </footer>
    </div >
}