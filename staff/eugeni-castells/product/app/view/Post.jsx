const { useState } = React;

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
  own,
  onDeletedPostSuccess,
  onUpdatedTextSuccess,
}) {
  const [view, setView] = useState("");

  const handleToggleClick = (id) => {
    try {
      logic.updatePostLikes(id);

      onPostLikeUpdate();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleDeletedPostSuccess = () => onDeletedPostSuccess();

  const handleDeleteClick = () => {
    try {
      logic.deletePost(id);

      handleDeletedPostSuccess();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleEditClick = () => {
    setView("edit-post");
  };

  const handleUpdatedTextSuccess = () => onUpdatedTextSuccess();

  const handleTextEditSubmit = (e) => {
    e.preventDefault();

    try {
      const {
        text: { value: text },
      } = e.target;

      logic.updatePostText(id, text);

      setView("");

      handleUpdatedTextSuccess();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleCancelEditTextClick = () => setView("");
  return (
    <article className="post">
      <h3>{author}</h3>
      <div className="post-wrapper">
        <img src={image} />
        <div className="post-content-wrapper">
          {view === "" && <p>{text}</p>}
          {view === "edit-post" && (
            <form onSubmit={handleTextEditSubmit} className="edit-text-form">
              <label htmlFor="text">Text</label>
              <input id="text" defaultValue={text} />
              <div className="edit-text-form-button-wrapper">
                <button type="button" onClick={handleCancelEditTextClick}>
                  Cancel
                </button>
                <button type="submit">Update</button>
              </div>
            </form>
          )}
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
          {own && <span onClick={handleDeleteClick}>🗑️</span>}
          {own && <span onClick={handleEditClick}>✒️</span>}
        </div>
      </div>
    </article>
  );
}

export default Post;
