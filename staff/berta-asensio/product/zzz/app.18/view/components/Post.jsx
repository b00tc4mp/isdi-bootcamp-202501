import logic from '../../logic.js'

function Post({ post, onPostLikeToggled, onPostDeleted }) {
    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id)

            onPostLikeToggled()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteClick = () => {
        if(confirm('Delete post?'))

        try {
            logic.deletePost(post.id)

            onPostDeleted()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Post -> render')

    return<article className="post">

        <h3>{post.author.username}</h3>

        <img src={post.image} />

        <p>{post.text}</p>

        <div className="post-footer">
            <time className="post-time">{post.createdAt.toISOString()}</time>

            <button className="post-like" onClick={handleToggleLikeClick}>{`${post.liked ? '💗' : '🤍'} (${post.totalLikes})`}</button>

            {post.own && <button className="delete-post" onClick = {handleDeleteClick}>🗑</button>}
        </div>
    </article>
}

export default Post

