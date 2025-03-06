import logic from '../../logic/logic.js';
function CreatePost({onPostCreateSubmit, onCancelClick}) {

  const handleCreatePostSubmit = (event) => {
    event.preventDefault();

    try {
        //destructuring del formulario
        const { target: form } = event;
        //destructuring de los valores del formulario
        const {
            image: { value: image },
            title: { value: title },
        } = form;
        //llamo a mi logica de creacion de posts
        logic.createPost(image, title);
        //limpio el formulario
        form.reset();
    
        onPostCreateSubmit();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };



  const handleCancelClick = () => {
    onCancelClick();
  }

  console.debug('CreatePost --> render');
  return (
    <div className="create-post">
      <form onSubmit={handleCreatePostSubmit} className="create-post__form">
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          className="create-post__form__input"
        />
        <input
          type="url"
          name="image"
          placeholder="image"
          required
          className="create-post__form__input"
        />
        <button type="submit" className="create-post__form__button">
          Create Post
        </button>
        
         <a onClick={handleCancelClick}>Cancel</a> 
      </form>
    </div>
  );
}

export default CreatePost