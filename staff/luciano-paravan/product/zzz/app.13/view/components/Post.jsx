const { useState } = React

import logic from '../../logic'

function Post({ post, onPostLikeToggled, onPostDeleted, onSavePost, onPostTextEdited }) {
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
    
    const handleSaveClick = () => {
        try {
            logic.savePost(post.id)

            onSavePost()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteClick = () => {
        if (confirm('Delete post?')) {
            try {
                logic.deletePost(post.id)
    
                onPostDeleted()
            } catch (error) {
                console.error(error)
    
                alert(error.message)
            }
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

    return <article className="post">
    <h3>{post.author.username}</h3>

    <img src={post.image} />

    {view === '' && <p>{post.text}</p>}

    {view === 'edit-text' && <form onSubmit={handleEditTextSubmit}>
        <label htmlFor="text">Text</label>
        <input type="text" id="text" defaultValue={post.text}/>
        <button onClick={handleEditTextCancelClick}>Cancel</button>
        <button type="submit">Save</button>
        </form>}

    
    <div className="post-footer">
        <time>{post.createdAt.toISOString()}</time>
        
        <button onClick={handleToggleLikeClick}>{`${post.liked? '❤️' : '🤍'}(${post.likesCount})`}</button>
        
        {post.own && <button onClick={handleDeleteClick}>🗑️</button>}

        {post.own && <button onClick={handleEditTextClick}>📝</button>}

        {<button onClick={handleSaveClick}>Save Post 🏷️</button>}
    </div>

</article>
}

export default Post