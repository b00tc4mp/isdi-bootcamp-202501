import logic from "../../logic/logic.js";

function Post({ post, onToggleLikeClick, onDeleteClick }) {
  const handleToggleLikeClick = () => {
    try {
      logic.toggleLikePost(post.id);

      onToggleLikeClick();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleDeleteClick = () => {
    if (confirm("Delete post?"))
      try {
        logic.deletePost(post.id);

        onDeleteClick();
      } catch (error) {
        console.error(error);

        alert(error.message);
      }
  };

  console.debug("Post -> render");

  return (
    <article className="post-card">
    <h3 className="post-author">{post.author.name}</h3>
    <img 
        src={post.image} 
        alt={post.title}
        className="post-image"
    />
    <p className="post-title">{post.title}</p>
    <div className="post-footer">
        <time className="post-date">
            {new Date(post.createdAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
        </time>
        <div className="post-actions">
            <button 
                onClick={handleToggleLikeClick}
                className={`like-button ${post.liked ? 'liked' : ''}`}
            >
                {post.liked ? "♥️" : "🤍"} ({post.likesCount})
            </button>
            {post.own && (
                <button 
                    onClick={handleDeleteClick}
                    className="delete-button"
                >
                    🗑️
                </button>
            )}
        </div>
    </div>
</article>
  );
}

export default Post;
