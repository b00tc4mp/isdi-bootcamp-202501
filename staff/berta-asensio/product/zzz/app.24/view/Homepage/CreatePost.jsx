import { logic } from '../../logic/index.js'

export function CreatePost({onPostCreated, onPostCreateCancelled}) {
    console.debug('CreatePost -> render')

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text } } = form

            console.log('Image', image)
            console.log('Text', text)
            
            logic.createPost(image, text)
                .then(() =>  onPostCreated())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelClick = () => onPostCreateCancelled()

    return (
        <section>
            <form onSubmit={handleFormSubmit}>

                <label htmlFor="image">Image</label>
                <input type="url" id="image" name="image" />

                <label htmlFor="text">Text</label>
                <input type="text" id="text" name="text" />

                <button type="submit">Add post</button>

            </form>

            <a onClick={handleCancelClick} >Cancel</a>
        </section>
    )
}
