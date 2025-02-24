const { useState, useEffect } = React

function Home({ onLogoutClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')
    const [posts, setPosts] = useState([])

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

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogoutClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    const handleAddPostClick = () => {
        setView('create-post')
    }

    const onCancelCreatePostClick = () => {
        setView('posts')
    }

    const onAddNewCommentClick = () => {
        console.log('Create new comment')

    }


    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event
            const {
                img: { value: img },
                text: { value: text }
            } = form

            logic.createPost(img, text)
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
        <h1>Logo</h1>

        <h2>Hello, {userName}!</h2>

        <button type="button" onClick={handleLogoutClick}>Logout</button>

        {view === 'posts' && <section>
            {posts.map(post =>
                <article key={post.id}>
                    <h3>{logic.getAuthorUsername(post)}</h3>
                    <img src={post.image}
                        width='500px' />
                    <p>{post.text}</p>
                    <button onClick={() => handleToggleLikePostClick(post.id)}> {`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}</button>
                    <button onClick={onAddNewCommentClick}>🗨️</button>

                    <section>
                        {post.comments.map((comment, index) => <p key={index}>{comment}</p>)}

                    </section>


                    <time style={{ display: 'block' }}>{new Date(post.createdAt).toISOString()}</time>
                </article>
            )}
        </section>}

        {view === 'create-post' && <section>
            <form onSubmit={handleCreatePostSubmit}>
                <label htmlFor="image">Image</label>
                <input id='img' type="url" />

                <label htmlFor="text">Text</label>
                <input id='text' type="text" />

                <button type="submit">Create</button>
            </form>

            <a onClick={onCancelCreatePostClick}>Cancel</a>
        </section>}
        {view === 'posts' && <button onClick={handleAddPostClick}>+</button>}
    </div>
}