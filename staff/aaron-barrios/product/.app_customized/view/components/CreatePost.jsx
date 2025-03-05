const { useState, useEffect } = React

import logic from '../../logic.js'

function CreatePost({ onPostCreateSubmit, onCreatePostCancel }) {
    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            logic.createPost(image, text)

            form.reset()

            onPostCreateSubmit()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelClick = () => {
        try {
            onCreatePostCancel()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


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

            <button type="submit">Create</button>
        </form>

        <a onClick={handleCancelClick}>Cancel</a>
    </section>
}

export default CreatePost