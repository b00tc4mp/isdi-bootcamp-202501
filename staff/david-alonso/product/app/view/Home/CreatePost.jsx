
import { logic } from '../../logic/index.js'

export function CreatePost({ onPostCreated, onPostCreateCancelled }) {

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
        <div>
            <h1>NEW POST</h1>

            <form onSubmit={handleFormSubmit} className='form-text'>

                <input type="url" id="image" placeholder=" IMAGE" className="input" />

                <input type="text" id="text" placeholder=" TEXT" className="input" />

                <button type="submit" >CREATE</button>
            </form>
        </div>

        <div >
            <a onClick={handleCancelClick} className="anchorCancel">CANCEL</a>
        </div>
    </section>
}
