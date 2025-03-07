import logic from '../../logic.js'

function CreatePost({ onPostCreateSubmit, onCancelClick }) {

    const handleCreatePostSubmit = event => {
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

    console.debug('CreatePost -> render')

    return <section>
        <div className="loginRegister">
            <h1>NEW POST</h1>

            <form onSubmit={handleCreatePostSubmit} className='formRegister'>

                <input type="url" id="image" placeholder=". 📷 Image" className="input" />

                <input type="text" id="text" placeholder=". 🔤 Text" className="input" />

                <button type="submit" >CREATE</button>
            </form>
        </div>

        <div >
            <a onClick={onCancelClick} className="anchorCancel">CANCEL</a>
        </div>
    </section>
}

export default CreatePost