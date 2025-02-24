function CreatePost({onCancelClick, onAddPostSubmit}) {

    const handleAddSubmit = event => {
        event.preventDefault();

        try {
            const {target : form } = event

            const {image: {value:image}, title: {value: title}} = form

            logic.addPost(title,image);

            form.reset();

            onAddPostSubmit();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }
     
    return <div>
        <h1>Create a post</h1>
        <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title"/>

            <label htmlFor="image">Enter image url</label>
            <input type="url" id="image"/>
            <span>
                <a style={{ cursor: 'pointer' }} onClick={onCancelClick}>Cancel</a>
                <button type="submit" style={{ marginLeft: '50px' }}>Post</button>
            </span>
        </form>
    </div>

}