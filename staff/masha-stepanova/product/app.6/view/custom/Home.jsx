const { useState, useEffect } = React

function Home({ onLogoutClick, onProfileClick, onCancelClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUsername] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            const name = logic.getUserName()
            const posts = logic.getPosts()

            setUsername(name)
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
        try {
            setView('addPost')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelClick = () => {
        try {
            onCancelClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostSubmit = (event) => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            logic.addPost(image, text)

            const posts = logic.getPosts()

            setPosts(posts)
            setView('posts')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLikeClick = (postId) => {
        try {
            logic.likePost(postId)

            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCommentSubmit = (event) => {
        try {
            // const name = logic.getUserName()
            const { target: form } = event

            const {
                commentText: { value: commentText }
            } = form

            logic.commentPost(postId, commentText)

            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleProfileClick = () => {
        onProfileClick()
    }

    return <div class="posts">
        {/* // style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}> */}
        {/* > */}
        <section class="header">
            <h1>Logo</h1>
            <h3>Welcome, {userName}</h3>
            <button onClick={handleProfileClick}>🤴🏻</button>
        </section>

        {view === 'posts' && <section> {posts.map(post => <article>
            <h3>{post.author}</h3>

            <img src={post.image} />

            <section className="post-underline">
                <p>{post.text}</p>
                <button onClick={() => handleLikeClick(post.id)}>{`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}</button>
                {/* <form onSubmit={handleCommentSubmit}>

                    <button type="submit">📋</button>
                </form> */}

            </section>
            {/* <p>{post.comments}</p> */}

            <time>{post.createdAt}</time>
        </article>)}
        </section>}

        {view === 'addPost' && <section >
            {/* style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}> */}
            <h1>Logo</h1>

            <p>To add new post you have to add the image link and a description to it. Try it now!</p>

            <form onSubmit={handleAddPostSubmit} >
                {/* style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}> */}
                <label htmlFor="image">Add here a link to your image:</label>
                <input type="text" id="image" />

                <label htmlFor="text">Add here a little description:</label>
                <input type="text" id="text" />

                <button type="submit">Add post</button>
            </form>
            <a onClick={handleCancelClick}>Cancel</a>
        </section>}

        <footer>
            <button onClick={handleLogoutClick}>Logout</button>
        </footer>

    </div >
}