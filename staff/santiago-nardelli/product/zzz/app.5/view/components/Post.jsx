function Post({post}){


    return(
        <article>
            <h3>{post.author.name}</h3>
            <img src={post.image} alt={post.title} />
            <p>{post.title}</p>
            <time>{post.createdAt.toISOString()}</time>
            <p>{post.likesCount}</p>
            <button onClick={() => handleToggleLikePosts(post.id)}>
                {`${post.liked ? "♥️" : "🤍"} (${post.likesCount})`}
            </button>
        </article>
    )
}
export default Post;