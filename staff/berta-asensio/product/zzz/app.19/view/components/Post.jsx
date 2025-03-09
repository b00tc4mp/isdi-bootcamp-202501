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
        if(confirm('Delete post?'))

        try {
            logic.deletePost(post.id)

            onPostDeleted()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleEditPostTextClick = () => setView('edit-post')

    const handleEditPostCancelClick = () => setView('')

    const handleEditPostSubmit = event => {
        event.preventDefault()
        
        try {
            const { target : form } = event

            const { text: { value: text }} = form

            logic.updatePostText(post.id, text)

            onPostTextEdited()

            setView('')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Post -> render')

    return<article className="post">

        <h3>{post.author.username}</h3>

        <img src={post.image} />

        {view === '' && <p>{post.text}</p>}

        {view === 'edit-post' && <form onSubmit={handleEditPostSubmit}>
            <label htmlFor="text">Text</label>
            <input type="text" id="text" defaultValue={post.text}/>

            <button type="button" onClick={handleEditPostCancelClick}>Cancel</button>
            <button type="submit">Save</button>
            </form>}

        <div className="post-footer">
            <time className="post-time">{post.createdAt.toISOString()}</time>

            <button className="post-like" onClick={handleToggleLikeClick}>{`${post.liked ? '💗' : '🤍'} (${post.totalLikes})`}</button>

            {post.own && <button className="edit-post" onClick = {handleEditPostTextClick}>✏</button>}

            {post.own && <button className="delete-post" onClick = {handleDeleteClick}>🗑</button>}
        </div>
    </article>
}

export default Post

