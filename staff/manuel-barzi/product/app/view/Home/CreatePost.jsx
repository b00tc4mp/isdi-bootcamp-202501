import { logic } from '../../logic'
import { useContext } from '../../context'

export function CreatePost({ onPostCreated, onPostCreateCancelled }) {
    const { alert } = useContext()

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text } } = form

            logic.createPost(image, text)
                .then(() => onPostCreated())
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

    console.debug('CreatePost -> render')

    return <section>
        <form onSubmit={handleFormSubmit}>
            <div className="field">
                <label htmlFor="image">Image</label>
                <input type="url" id="image" />
            </div>

            <div className="field">
                <label htmlFor="text">Text</label>
                <input type="text" id="text" />
            </div>

            <button className="secondary" type="button" onClick={handleCancelClick}>Cancel</button>
            <button type="submit">Create</button>
        </form>

    </section>
}