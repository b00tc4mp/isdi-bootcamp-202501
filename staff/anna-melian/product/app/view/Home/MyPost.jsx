import { useState, useEffect } from 'react'

import { logic } from "../../logic";

export function MyPost({ post, onPostLikeToggled, onPostDeleted, onPostEdited }) {
    const [view, setView] = useState('')

    useEffect(() => {

        console.debug('useEffect mypost')

    }, [])


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
        if (confirm('Delete post?'))
            try {
                logic.deletePost(post.id)

                onPostDeleted()
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

            const updated = logic.updatePostText(post, text)

            if (!updated) {
                alert('No modifications')
            } else {

                alert('Post successfully updated 🧙‍♀️')
                setView('')
                onPostEdited()

            }

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

