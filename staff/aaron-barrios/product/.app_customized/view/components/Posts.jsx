const { useState, useEffect } = React

import logic from '../../logic.js'

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

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

    const handleDeleteButtonClick = postId => {
        try {
            logic.deletePost(postId)

            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section>
        {posts.map(post => (
            <article>
                <div className="post-header">
                    <h3>{post.author.username}</h3>
                    <time>{logic.formatedDate(post.createdAt)}</time>
                </div>
                <img src={post.image} />

                <div className="post-footer">
                    <p>{post.text}</p>
                    <button type="button"
                        onClick={() => handleLikeButtonClick(post.id)} >{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>
                    <h5>{post.likes}</h5>
                    <button type="button" onClick={() => commentButtonClick(post.id)}>📃</button>
                    {logic.isCurrentAuthor(post.author.id) && <button type="button" onClick={() => handleDeleteButtonClick(post.id)}>X</button>}
                </div>

                {/* --- COMMENTS SECTION ---
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
                </section>} */}
            </article>
        ))}
    </section>
}

export default Posts