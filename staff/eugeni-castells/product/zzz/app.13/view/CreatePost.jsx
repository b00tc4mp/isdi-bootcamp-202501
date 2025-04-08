function CreatePost({ onPostCreation, onCancelClick }) {
  return (
    <div className="create-post-container">
      <form
        className="create-post-form"
        onSubmit={function (event) {
          event.preventDefault();

          const { target: form } = event;

          const {
            image: { value: image },
            text: { value: text },
          } = form;

          const post = {
            image: image,
            text: text,
          };

          onPostCreation(post);
        }.bind(this)}
      >
        <input type="text" name="image" placeholder="Image URL" />
        <input type="text" name="text" placeholder="text" />
        <div className="create-post-button-wrapper">
          <button type="submit">Create Post</button>
          <button onClick={onCancelClick}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
