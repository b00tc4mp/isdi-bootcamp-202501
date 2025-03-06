const { useState } = React

import logic from '../../logic.js'

function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const [view, setView] = useState('')

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id)

            onPostLikeToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteClick = () => {
        try {
            logic.deletePost(post.id)

            onPostDeleted()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleEditTextClick = () => setView('edit-text')

    const handleEditTextCancelClick = () => setView('')

    const handleEditTextSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { text: { value: text } } = form

            logic.updatePostText(post.id, text)

            onPostTextEdited()

            setView('')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    return <article>
        <h3>{post.author.username}</h3>

        <img src={post.image} />

        {view === '' && <p>{post.text}</p>}

        {view === 'edit-text' && <form onSubmit={handleEditTextSubmit}>
            <label htmlFor="text">Text</label>
            <input type="text" id="text" />

            <button type="button" onClick={handleEditTextCancelClick}>Cancel</button>
            <button type="submit" >Save</button>
        </form>}

        <div>
            <time>{post.createdAt.toISOString()}</time>

            <button onClick={() => handleToggleLikeClick(post.id)}>{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>

            <button onClick={handleEditTextClick}>✏️</button>

            <button onClick={handleDeleteClick}>🗑️</button>
        </div>
    </article>
}

export default Post