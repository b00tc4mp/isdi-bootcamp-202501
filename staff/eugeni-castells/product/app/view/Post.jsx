import logic from "../logic";

function Post({
  author,
  image,
  text,
  createdAt,
  id,
  liked,
  onPostLikeUpdate,
  likes,
}) {
  const handleToggleClick = (id) => {
    try {
      logic.updatePostLikes(id);

      onPostLikeUpdate();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };
  return (
    <article className="post">
      <h3>{author}</h3>
      <div className="post-wrapper">
        <img src={image} />
        <div className="post-content-wrapper">
          <p>{text}</p>
          <time>{createdAt.toISOString()}</time>
          <button
            onClick={() => {
              handleToggleClick(id);
            }}
            style={{ backgroundColor: liked ? "red" : "" }}
          >
            {"🤍"}
            {likes.length}
          </button>
        </div>
      </div>
    </article>
  );
}

export default Post;
