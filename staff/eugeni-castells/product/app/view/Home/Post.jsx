import { useState } from "react";
import { logic } from "../../logic";

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
      logic
        .updatePostLike(id)
        .then(() => {
          console.log("EUREKA");
          onPostLikeUpdate();
        })
        .catch((error) => {
          console.error("Asynchronous error", error);

          alert(error.message);
        });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleDeletedPostSuccess = () => onDeletedPostSuccess();

  const handleDeleteClick = () => {
    try {
      if (confirm("Do you want to delete?")) {
        logic
          .deletePost(id)
          .then(() => {
            handleDeletedPostSuccess();
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      }
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

      logic
        .updatePostText(id, text)
        .then(() => {
          setView("");

          handleUpdatedTextSuccess();
        })
        .catch((error) => {
          throw new Error(error.message);
        });
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
        <div className="post-button-wrapper">
          <span
            onClick={() => {
              handleToggleClick(id);
            }}
          >
            {liked ? "❤️" : "🤍"}
            {likes.length}
          </span>
          <div className="post-action-button-wrapper">
            {own && <span onClick={handleDeleteClick}>🗑️</span>}
            {own && <span onClick={handleEditClick}>✒️</span>}
          </div>
        </div>
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
        </div>
      </div>
    </article>
  );
}

export default Post;
