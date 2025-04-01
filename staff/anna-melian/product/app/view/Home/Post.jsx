import { useState } from 'react'

import { logic } from '../../logic/index.js'

export function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const [view, setView] = useState('')

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteClick = () => {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(post.id)
                    .then(() => onPostDeleted())
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
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
                .then(() => {
                    onPostTextEdited()

                    setView('')
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Post -> render')

    return <article>
        <div className='post-header'>
            <h3>{post.author.username}</h3>
            <div className='post-buttons'>
                {post.own && <button onClick={handleEditTextClick}>🪶</button>}
                {post.own && <button className='delete-button' onClick={handleDeleteClick}>🗑️</button>}
            </div>

        </div>


        <img src={post.image} />

        {view === '' && <p>{post.text}</p>}

        {view === 'edit-text' && <form onSubmit={handleEditTextSubmit}>
            <label htmlFor="text">Edit text</label>
            <input type="text" id="text" defaultValue={post.text} />

            <button type="button" className="cancel-edit" onClick={handleEditTextCancelClick}>Cancel</button>
            <button type="submit-edit">Save</button>
        </form>}

        <div className="post-footer">
            <button onClick={handleToggleLikeClick}>{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>

            <time className='time'>{new Date(post.createdAt.toISOString()).toLocaleDateString('es-ES')}</time>

        </div>
    </article>
}