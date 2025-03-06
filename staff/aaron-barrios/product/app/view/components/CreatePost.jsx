import logic from '../../logic.js'

function CreatePost({ onPostCreated, onPostCreateCancelled }) {
    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text }
            } = form

            logic.createPost(image, text)

            onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelClick = () => onPostCreateCancelled()


    return <section>
        <h2>Create Post</h2>

        <form onSubmit={handleCreatePostSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "left", gap: "5px" }}>
            <label htmlFor="image">Image</label>
            <input type="url" id="image" style={{ width: "350px" }} />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" style={{ width: "350px" }} />

            <button type="submit" style={{ width: "80px" }}>Create</button>
        </form>

        <a onClick={handleCancelClick}>Cancel</a>
    </section>
}

export default CreatePost