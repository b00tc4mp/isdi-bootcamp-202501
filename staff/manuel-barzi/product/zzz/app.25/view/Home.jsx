// import { useState, useEffect } from 'react'
const { useState, useEffect } = React

import logic from '../logic.js'

function Home({ onLogoutClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('Index -> useEffect')

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

    const handleAddPostClick = () => setView('create-post')

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text } } = form

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

    console.debug('Index -> render')

    return <div>
        <header>
            <h1>Logo</h1>

            <h2>Hello, {userName}!</h2>

            <button type="button" onClick={handleLogoutClick}>Logout</button>
        </header>

        <main>
            {view === 'posts' && <section>
                {posts.map(post =>
                    <article>
                        <h3>{post.author}</h3>

                        <img src={post.image} />

                        <p>{post.text}</p>

                        <div className="post-footer">
                            <time>{post.createdAt.toISOString()}</time>

                            <button onClick={() => handleToggleLikePostClick(post.id)}>{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>
                        </div>
                    </article>)}
            </section>}

            {view === 'create-post' && <section>
                <form onSubmit={handleCreatePostSubmit}>
                    <label htmlFor="image">Image</label>
                    <input type="url" id="image" />

                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" />

                    <button type="submit">Create</button>
                </form>

                <a>Cancel</a>
            </section>}
        </main>

        <footer>
            {view === 'posts' && <button onClick={handleAddPostClick}>+</button>}
        </footer>
    </div>
}

export default Home