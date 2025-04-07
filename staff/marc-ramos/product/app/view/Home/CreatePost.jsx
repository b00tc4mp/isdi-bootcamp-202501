import {logic} from '../../logic/index.js'
import { useContext } from '../../context'

export function CreatePost({ onPostCreated, onPostCreateCancelled }) {
    const { alert } = useContext()

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const {target: form} = event

            const {image: {value: image}, text: {value: text}} = form

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
            <label htmlFor="image">Image</label>
            <input type="url" id="image" />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" />

            <button type="submit">Create</button>
        </form>

        <a onClick={handleCancelClick} >Cancel</a>
    </section>
}