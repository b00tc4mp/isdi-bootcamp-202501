import logic from '../../logic.js'

function CreatePost({ onPostCreateCancelled, onPostCreated }) {

    const handleAddSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event

            const { image: { value: image }, title: { value: title } } = form

            logic.addPost(title, image);

            form.reset();

            onPostCreated();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return <div className="createpost">
        <h1>Create a post</h1>
        <form onSubmit={handleAddSubmit}>
            <div className="field">
                <input type="text" id="title" placeholder="Type a title" />
            </div>
            <div className="field">
                <input type="url" id="image" placeholder="Enter an url" />
            </div>
            <span>
                <a onClick={onPostCreateCancelled}>Cancel</a>
                <button type="submit">Post</button>
            </span>
        </form>
    </div>

}

export default CreatePost;