import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router'
import { useContext } from '../../context'
import { logic } from '../../logic'

export function Post({post, onPostDeleted, onPostDescriptionEdited, onPostLikeToggled}) {
    const { alert } = useContext()

    const [view, setView] = useState('')
    const [postDetails, setPostDetails] = useState([])

    const navigate = useNavigate()

    const { id, author, image, text, createdAt, currentPostModifiedAt, likes, liked, own } = post
    
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

    const { name: authorName, username: authorUsername } = author

    /*let likesString = ''
    let formattedDate = ''
    //useEffect(() => {
        const test = () => {
            try {
            logic.getLikesUsernames(likes)
                .then(likesUsernames => {
                    console.log('likesUsernames from post.jsx :>> ', likesUsernames);

                    likesString = likesToString(likesUsernames);
                    console.log('likesUsernames from post.jsx :>> ', likesString);

                    formattedDate = dateToFormat(createdAt);
                    console.log('likesUsernames from post.jsx :>> ', formattedDate);

                    setPostDetails([likesString, formattedDate])
                    // Aquí podrías actualizar el estado o cualquier otra cosa si es necesario
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }}
    //}, [])

    if (a > 0){
        test()
        a--
    }*/

    const handleUsernameClick = () => navigate(`/${authorUsername}`, { state: { userId: author.id } })
    
    return <article>
            <h2 onClick={handleUsernameClick}>{authorName}</h2>
        <figure>
            <img src={image} style={{ width: '100%', maxWidth: '300px', height: 'auto', objectFit: 'cover' }}/>
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
                <span>{postDetails[1]}</span>
            </section>
            <section>
                <p>{postDetails[0]}</p>
            </section>
            <section>
                <div>
                    <span onClick={handleUsernameClick} className="post-username" style={{fontWeight: 'bold'}} >{authorUsername}</span>
                    {': '}
                    {view === '' && <span className="post-description">{text}</span>}
                    {view === 'edit-post' && <form onSubmit={handleEditDescriptionSubmit}>
                        <label htmlFor='description'>Description</label>
                        <input type='text' id='description' defaultValue={text}></input>

                        <button type='button' onClick={handleEditDescriptionCancelClick}>Cancel</button>
                        <button type='submit'>Confirm</button>
                    </form>}
                </div>
            </section>
        </section>
    </article>
}