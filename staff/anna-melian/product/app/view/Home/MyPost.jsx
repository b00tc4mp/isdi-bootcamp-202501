import { useState } from 'react'

import { logic } from '../../logic/index.js'

export function MyPost({ post, onPostLikeToggled, onPostDeleted, onPostEdited }) {
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


    const handleEditClick = () => {

        view === '' ? setView('edit') : setView('')


    }
    const handleEditSubmit = event => {
        event.preventDefault()
        try {
            const { target: form } = event
            const {
                text: { value: text },

            } = form

            logic.updatePostText(post.id, text)
                .then(() => {
                    onPostEdited()

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

    const onCancelClick = () => {
        setView('')
    }


    console.debug('Post --> render')


    return <article key={post.id}>

        <div className='post-header'>
            <h3>{post.author.username}</h3>
            <div className='post-buttons'>
                <button onClick={handleEditClick}>🪶</button>
                <button onClick={handleDeleteClick} className="delete-button">🗑️</button>
            </div>
        </div>

        <img src={post.image} />

        {view !== 'edit' && <p>{post.text}</p>}
        {view === 'edit' && <form onSubmit={handleEditSubmit}>
            <input type="text" id="text" defaultValue={post.text} />
            <button className="submit-edit" type="submit">Edit</button>
            <a className="cancel-edit" onClick={onCancelClick}>Cancel</a>


        </form>}


        <div className="post-footer">
            <button onClick={handleToggleLikeClick}> {`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}</button>

            <time style={{ display: 'block' }}>{new Date(post.createdAt).toLocaleDateString('es-ES')}</time>
        </div>

    </article>

}

