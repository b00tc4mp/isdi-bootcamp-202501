import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import {logic} from '../../logic/index'

export function Post({post, onPostDeleted, onPostDescriptionEdited, onPostLikeToggled}) {
    const [view, setView] = useState('')

    const navigate = useNavigate()

    const { id, author, image, text, createdAt, currentPostModifiedAt, likes, liked, own } = post

    const handleDeleteClick = () => {
        try {
            logic.deletePost(id)
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
    
    const handleEditDescriptionClick = () => setView('edit-post')

    const handleEditDescriptionCancelClick = () => setView('')

    const handleEditDescriptionSubmit = event => {
        try {
            event.preventDefault()

            const { target: {description: {value: description}}} = event

            logic.editPost(id, description)
                .then(() => {
                    onPostDescriptionEdited()
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

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLike(id)
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

    const handleUsernameClick = () => navigate(`/${author.username}`, { state: { userId: author.id} })

    return <article>
        <h2 onClick={handleUsernameClick}>{author.authorName}</h2>

        <img src={image} />

        {view === '' && <p>{text}</p>}
    </article>
}