const { useState, useEffect } = React

import logic from '../../logic.js'

function Posts() {
    const [posts, setPosts] = useState ([])

    useEffect(() => {
        console.debug('Posts -> useEffect')

        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

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

    console.debug('Posts -> render')


    return <section>
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

export default Posts