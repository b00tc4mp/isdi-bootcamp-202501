import { useState } from 'react'

import { logic } from "../../logic/index.js"

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

    return <article >

        <div className="container-posts">

            <h3 className="userName">{post.author.username}</h3>

            <img src={post.image} />

            {view === 'edit-text' && <form className='form-text' onSubmit={handleEditTextSubmit}>
                <label htmlFor="text">Text Post</label>
                <input type="text" id="text" defaultValue={post.text} />

                <button type="button" className="edit-text" onClick={handleEditTextCancelClick}>Cancel</button>

                <button type="submit">Save</button>
            </form>}

            <div className="data">
                <p className="postText">{post.text}</p>

            </div>
            <div className="post-data">
                <time className="time">{post.createdAt.toLocaleString()}</time>

                <button onClick={() => handleToggleLikeClick(post.id)} className="like" >{`${post.liked ? '🧡' : '🤍'} (${post.likesCount})`} </button>

                {post.own && <button onClick={handleEditTextClick} className="edit" >✍</button>}

                {post.own && <button onClick={handleDeleteClick} className="delete" >🗑️</button>}
            </div>
        </div>
    </article>
}
