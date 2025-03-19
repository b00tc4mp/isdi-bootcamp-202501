function Post({ author, image, bio, date, id, liked, onSetPosts, likes }) {
  const handleToggleClick = (id) => {
    try {
      logic.updatePostLikes(id);

      let posts = logic.getPosts();

      onSetPosts(posts);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };
  return (
    <article>
      <h3>{author}</h3>
      <img src={image} style={{ width: "80%" }} />
      <p>{bio}</p>
      <time>{date}</time>
      <button
        onClick={() => {
          handleToggleClick(id);
        }}
        style={{ backgroundColor: liked ? "red" : "" }}
      >
        {"🤍"}
        {likes.length}
      </button>
    </article>
  );
}
