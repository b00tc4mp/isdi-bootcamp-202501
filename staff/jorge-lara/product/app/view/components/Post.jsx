const { useState } = React;
import logic from '../../logic.js'

function Post({ post, onPostLikeToggled, onPostDeleted }) {
    const [view, setView] = useState('');

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id);

            onPostLikeToggled();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handleDeleteClick = () => {
        if (confirm('Delete post?')) {
            try {
                logic.deletePost(post.id);

                onPostDeleted();
            } catch (error) {

            }
        }
    }

    return <article>
        <h3>{post.author.username}</h3>
        <img src={post.image} />


        <div className="post-footer">
            <p>{post.text}</p>

            <button onClick={handleToggleLikeClick}>{`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}</button>
            {post.own && <button onClick={handleDeleteClick}>🗑️</button>}
        </div>
        <time>{post.createdAt.toISOString()}</time>
    </article>
}

export default Post;