import { useState } from 'react'

import logic from '../../logic.js'

function Post({post, onPostDeleted, onPostDescriptionEdited, onPostLikeToggled}) {
    const [view, setView] = useState('')

    const { id, author, imageSrc, textDescription, createdAt, currentPostModifiedAt, likes, liked, own } = post
    
    const likesToString = likes => {
        if (likes.length === 0) {
            return ''
        } else if (likes.length < 3) {
            return `${likes.join(' and ')} liked that.`
        } else {
            const firstLike = likes[0]
            const secondLike = likes[1]
            const restLikes = likes.length - 2

            return `${firstLike}, ${secondLike} and ${restLikes} more people liked that.`
        }
    }
    
    const dateToFormat = postDate => {
        const date = new Date(postDate)
        
        const options = {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        }
        
        const formatedDate = date.toLocaleString('en-EN', options)

        // const [calendar, time] = formatedDate.split(', ')
        // const [ month, day ] = calendar.split(' ')
        // const [ hours, minutes ] = time.split(':')

        // return `${day}/${month}, ${hours}:${minutes}`
        return formatedDate
    }

    const handleDeleteClick = () => {
        try {
            logic.deletePost(id)

            onPostDeleted()
        } catch (error) {
            logic.helper.handleError(error)
        }
    }
    
    const handleEditDescriptionClick = () => setView('edit-post')

    const handleEditDescriptionCancelClick = () => setView('')

    const handleEditDescriptionSubmit = event => {
        try {
            event.preventDefault()

            const { target: {description: {value: description}}} = event

            logic.editPost(id, description)

            onPostDescriptionEdited()
            setView('')
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLike(id)

            onPostLikeToggled()
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const { name: authorName, username: authorUsername } = author

    let likesString = ''
    let formattedDate = ''
        try {
            const likesUsernames = logic.getLikesUsernames(likes)
            likesString = likesToString(likesUsernames)

            formattedDate = dateToFormat(createdAt)
        } catch (error) {
            logic.helper.handleError(error)
        }

    return <article>
            <h2>{authorName}</h2>
        <figure>
            <img src={imageSrc} style={{ width: '100%', maxWidth: '300px', height: 'auto', objectFit: 'cover' }}/>
        </figure>
        <section>
            <section className="functionalities-and-date">
                <div className="functionalities">
                    <button onClick={handleToggleLikeClick}>{likes.length} {liked ? '❤️' : '🤍'}</button>
                    {own && <div>
                        <button onClick={handleDeleteClick}>🗑</button>
                        <button onClick={handleEditDescriptionClick}>✏</button>
                    </div>}
                </div> 
                <span>{formattedDate}</span>
            </section>
            <section>
                <p>{likesString}</p>
            </section>
            <section>
                <div>
                    <span className="post-username" style={{fontWeight: 'bold'}}>{authorUsername}</span>
                    {': '}
                    {view === '' && <span className="post-description">{textDescription}</span>}
                    {view === 'edit-post' && <form onSubmit={handleEditDescriptionSubmit}>
                        <label htmlFor='description'>Description</label>
                        <input type='text' id='description' defaultValue={textDescription}></input>

                        <button type='button' onClick={handleEditDescriptionCancelClick}>Cancel</button>
                        <button type='submit'>Confirm</button>
                    </form>}
                </div>
            </section>
        </section>
    </article>
}

export default Post