import { useState } from 'react'

import { logic } from "../../../logic/index"

export function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const [view, setView] = useState('')

    const handleToggleLikePost = () => {
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
        <h3>{post.author.username}</h3>

        <img src={post.image} />

        {view === 'edit-text' && <form onSubmit={handleEditTextSubmit}>
            <label htmlFor="text">Text</label>
            <input type="text" id="text" defaultValue={post.text} />

            <button type="button" onClick={handleEditTextCancelClick}>Cancel</button>
            <button type="submit">Save</button>
        </form>}

        <section className="post-underline">
            <p>{post.text}</p>
            <button className="like" onClick={() => handleToggleLikePost()}>{`${post.liked ? '❤️' : '🤍'} ${post.likesCount}`}</button>

            {post.own && <button onClick={handleEditTextClick}>✏️</button>}

            {post.own && <button onClick={handleDeleteClick}>🗑️</button>}
        </section>
        <p>{post.createdAt.toISOString()}</p>
    </article>
}