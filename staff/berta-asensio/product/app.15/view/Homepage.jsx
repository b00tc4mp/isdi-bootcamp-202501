const { useState, useEffect } = React

import logic from '../logic.js'

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
        <header>
            <img src="doc\images\logo-bee-you.png" alt="Bee logo" className="bee-logo" />
            <h2>Hello, {userName}!</h2>

            <a onClick={onReturnClick}>Logout</a> 
        </header>

        <main>
            {view === 'posts' && <section>
                {posts.map(post =>
                    <article className="post">

                        <h3>{post.author.username}</h3>

                        <img src={post.image} />

                        <p>{post.text}</p>

                        <div className="post-footer">
                            <time className="post-time">{post.createdAt.toISOString()}</time>

                            <button className="post-like" onClick={() => handleToggleLikePostClick(post.id)}>{`${post.liked ? '💗' : '🤍'} (${post.totalLikes})`}</button>
                        </div>
                    </article>
                )}

            </section>
            }
            {view === 'create-post' && <section>

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
        </main>
        <footer>
            {view === 'posts' && <button onClick={handleCreatePostClick}>+ Create Post</button>
            }
        </footer>
    </div>
}

export default Homepage