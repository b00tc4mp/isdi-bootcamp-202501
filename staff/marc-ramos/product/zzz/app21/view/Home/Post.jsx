import { useState } from 'react'

import { logic } from '../../logic/index.js'

export function Post({post, onPostLikeToggled, onPostDeleted, onPostTextEdited}) {

    const [view, setView] = useState('')

    const handleToggleLikeClick = () => { 
        try{
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

    const handleDeleteClick = () => { // handleclick para detectar el click de el boton delete post
        if (confirm('Delete post?')) // confirm para preguntar si estamos seguros de borrar el post
            try{
                logic.deletePost(post.id) // llamamos a la logica de delete post
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

    const handleEditTextClick = () => setView('edit-text') // click en edit post y aparece un edit text

    const handleEditTextCancelClick = () => setView('') // cancelamos el edit text

    const handleEditTextSubmit = event => {
        event.preventDefault()

        try {
            const {target: form} = event
            const {text: {value: text}} = form

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

        <img src={post.image}/>

        {view === '' && <p>{post.text}</p>}

        {view === 'edit-text' && <form onSubmit={handleEditTextSubmit}>
            <label htmlFor="text">Text</label>
            <input type="text" id="text" defaultValue={post.text}/>

            <button type="button" className="secondary" onClick={handleEditTextCancelClick}>Cancel</button>
            <button type="submit">Save</button>
        </form>}

        <div className="post-footer">
            <time>{new Date(post.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}</time>

            <button onClick={handleToggleLikeClick}>{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>

            {post.own && <button onClick={handleEditTextClick}>🔖</button>}

            {post.own && <button onClick={handleDeleteClick}>🗑</button>}
        </div>
    </article>
}