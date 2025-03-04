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
            name: { value: name },
            year: { value: year },
            location: { value: location },
            bio: { value: bio },
          } = form;

          const post = {
            image: image,
            name: name,
            year: year,
            location: location,
            bio: bio,
          };

          onPostCreation(post);
        }.bind(this)}
      >
        <input type="text" name="image" placeholder="Image URL" />
        <input type="text" name="name" placeholder="castle's name" />
        <input type="text" name="year" placeholder="year of construction" />
        <input type="text" name="location" placeholder="location" />
        <input type="text" name="bio" placeholder="bio" />
        <div className="create-post-button-wrapper">
          <button type="submit">Create Post</button>
          <button onClick={onCancelClick}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
