function CreatePost({onCancelClick, onCreatePostSubmit, reloadPosts}) {
    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const form = event.target // desestructurar
            const imageSrc = form[0].value // desestructurar
            const textDescription = form[1].value // desestructurar

            logic.createNewPost(imageSrc, textDescription)

            form.reset()

            alert('Post created')

            //reloadPosts()

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
                <input type="url" id="image-route" placeholder="image route"/>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" placeholder="description"/>
                <div>
                    <a onClick={onCancelClick}>Cancel</a>
                    <button type="submit" form="create-post">Create</button>
                </div>
            </form>
        </section>
    </section>
}