import logic from '../../logic.js'

function Post({ post, onToggleLikeClick, onDeleteClick }) {
    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id)

            onToggleLikeClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteClick = () => {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(post.id)

                onDeleteClick()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    console.debug('Post -> render')

    return <article>
        <h3>{post.author.username}</h3>

        <img src={post.image} />

        <p>{post.text}</p>

        <div className="post-footer">
            <time>{post.createdAt.toISOString()}</time>

            <button onClick={handleToggleLikeClick}>{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>

            {post.own && <button onClick={handleDeleteClick}>🗑️</button>}
        </div>
    </article>
}

export default Post