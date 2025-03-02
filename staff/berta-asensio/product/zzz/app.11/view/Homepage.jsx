const { useState, useEffect } = React


function Homepage ({onReturnClick}) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')
    const [posts, setPosts] = useState ([])

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            const name = logic.getUserName()
            const posts = logic.getPosts()

            setUserName(name)
            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleCreatePostClick = () => setView('create-post')

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text }} = form

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

    console.debug('Home -> render')

    return <div>
        <h1>Bee you</h1>

        <h2>Hello, {userName}!</h2>

        {view === 'posts' && <section>
            {posts.map(post =>
                <article>

                    <h3>{post.author}</h3>

                    <img src={post.image} />

                    <p>{post.text}</p>

                    <time>{post.createdAt.toISOString()}</time>

                    <button onClick={() => handleToggleLikePostClick(post.id)}>{`${post.liked? '💗' : '🤍'} (${post.totalLikes})`}</button>

                </article>
            )}

        </section>
        }
        { view === 'create-post' && <section>

            <form onSubmit={handleCreatePostSubmit}>

                <label htmlFor="image">Image</label>
                <input type="url" id="image" />

                <label htmlFor="text">Text</label>
                <input type="text" id="text" />

                <button type="submit">Add post</button>

            </form>

            <a>Cancel</a>

        </section>
        }

        {view === 'posts' && <button onClick={handleCreatePostClick}>+</button>
        }

        <a onClick={onReturnClick}>Logout</a>

    </div>
}