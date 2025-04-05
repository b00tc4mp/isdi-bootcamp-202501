import { logic } from '../../logic/index.js'
import {errors} from 'com'

import { useContext } from '../../context.js'

const {SystemError, ValidationError} = errors

export function CreatePost({ onPostCreated, onPostCreateCancelled }) {
    const {alert} = useContext()

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            logic.createPost(image, text)
                .then(() => { onPostCreated() })
                .catch(error => {
                    console.error(error)

                    if(error instanceof SystemError)
                        alert('⛔ ' + error.message)
                    else
                        alert('⚠️ ' + error.message)
                })
        } catch (error) {
            console.error(error)

            if(error instanceof ValidationError)
                alert('❌ ' + error.message)
            else
                alert('⛔ ' + error.message)
        }
    }

    const handleCancelClick = () => onPostCreateCancelled()


    return <section className="create-post">
        <h2 style={{ marginBottom: '1rem' }}>Create Post</h2>

        <form onSubmit={handleCreatePostSubmit} >

            <div className="field">
                <label htmlFor="image">Image</label>
                <input type="url" id="image" />
            </div>

            <div className="field">
                <label htmlFor="text">Text</label>
                <input type="text" id="text" />
            </div>

            <button onClick={handleCancelClick} type="button">Cancel</button>
            <button type="submit">Create</button>
        </form>

    </section>
}