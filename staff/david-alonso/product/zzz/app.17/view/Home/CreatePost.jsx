
import { logic } from '../../logic/index.js'

export function CreatePost({ onPostCreated, onPostCreateCancelled }) {

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text } } = form

            logic.createPost(image, text)

            onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelClick = () => onPostCreateCancelled()

    console.debug('CreatePost -> render')

    return <section>
        <div className="loginRegister">
            <h1>NEW POST</h1>

            <form onSubmit={handleFormSubmit} className='formRegister'>

                <input type="url" id="image" placeholder=". 📷 Image" className="input" />

                <input type="text" id="text" placeholder=". 🔤 Text" className="input" />

                <button type="submit" >CREATE</button>
            </form>
        </div>

        <div >
            <a onClick={handleCancelClick} className="anchorCancel">CANCEL</a>
        </div>
    </section>
}
