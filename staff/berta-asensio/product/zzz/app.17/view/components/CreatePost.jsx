import logic from '../../logic.js'

function CreatePost({onPostCreateSubmit}) {
    console.debug('CreatePost -> render')

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text } } = form

            logic.createPost(image, text)

            onPostCreateSubmit()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section>
        <form onSubmit={handleFormSubmit}>

            <label htmlFor="image">Image</label>
            <input type="url" id="image" />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" />

            <button type="submit">Add post</button>

        </form>

        <a>Cancel</a>
    </section>

}

export default CreatePost