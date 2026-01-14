const { useState } = React

import logic from '../../logic.js'

function CreatePost ({ onPostCreated, onPostCreateCancelled }) {
    
    const handleFormSubmit = event => {
        event.preventDefault()
        
        try {
            const { target: form } = event
            
            const {
                image: { value: image },
                text: { value: text }
            } = form
            
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
    <form className='createPostForm' onSubmit={handleFormSubmit}>
        <label htmlFor="image">url image</label>
        <input type="url" id="image" />
        <label htmlFor="text">Text:</label>
        <input type="text" id="text"/>
        <button type="submit">Create</button>
    </form>
    <a onClick={handleCancelClick}>Cancel</a>
</section>
}

export default CreatePost