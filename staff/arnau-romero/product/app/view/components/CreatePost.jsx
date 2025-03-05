import logic from '../../logic.js'
function CreatePost({ onPostCreateSubmit }) {
    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try{
            const { target: form} = event

            const { image: { value: image }, text: { value: text } } = form

            logic.createPost(image, text)

            onPostCreateSubmit()
        }catch (error) {
            console.error(error)

            alert(error.message)
        }

        console.debug('CreatePost -> render')

        return <section>
        <form onSubmit = {handleCreatePostSubmit}>
            <label htmlFor="image">Image</label>
            <input type="url" id="image" />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" />

            <button type="submit">Create</button>    
        </form>
        <a>Cancel</a> 
        </section>
    }
}
export default CreatePost