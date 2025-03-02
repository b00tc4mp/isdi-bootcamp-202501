function CreatePost({onCancelClick, onCreatePostSubmit, reloadPosts}) {
    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target

            const {imageRoute: {value: imageSrc}, description: {value: textDescription}} = form

            logic.createNewPost(imageSrc, textDescription)

            form.reset()

            alert('Post created')

            reloadPosts()

            onCreatePostSubmit()
        } catch (error) {
            logic.helpers.handleError(error)
        }
    }
    return <section>
        <section>
            <h2>Create new post</h2>
            <form id="create-post" onSubmit={handleCreatePostSubmit}>
                <label htmlFor="image-route">Image route</label>
                <input type="url" id="imageRoute" placeholder="image route"/>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" placeholder="description"/>
                <div className="buttons-div">
                    <a onClick={onCancelClick}>Cancel</a>
                    <button type="submit" form="create-post">Create</button>
                </div>
            </form>
        </section>
    </section>
}