import { useState } from 'react'
import { useNavigate } from 'react-router'

import { logic } from '../../logic'
import { useContext } from '../../context'


export function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const { alert, confirm } = useContext()
    const [view, setView] = useState('')

    const navigate = useNavigate()

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
        confirm('Delete post?')
            .then(accepted => {
                if(accepted)
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
            })    
    }

    const handleEditPostTextClick = () => setView('edit-post')

    const handleEditPostCancelClick = () => setView('')

    const handleEditPostSubmit = event => {
        event.preventDefault()
        
        try {
            const { target : form } = event

            const { text: { value: text }} = form

            logic.updatePostText(post.id, text)
                .then(() => {
                    onPostTextEdited()

                    setView('')
                })
                .catch(error => {
                    console.error(error)
    
                    alert(error.messsage)
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleUsernameClick = () => navigate(`/${post.author.username}`, { state: { userId: post.author.id } })

    console.debug('Post -> render')

    return<article className="flex flex-col py-[var(--padding-y)] px-[var(--padding-x)] m-0">

        <h3 className="m-0"onClick={handleUsernameClick}>{post.author.username}</h3>

        <img className="w-full" src={post.image} />

        {view === '' && <p className="m-0">{post.text}</p>}

        {view === 'edit-post' && <form onSubmit={handleEditPostSubmit}>
            <label htmlFor="text">Text</label>
            <input type="text" id="text" defaultValue={post.text}/>

            <button type="button" className="secondary" onClick={handleEditPostCancelClick}>Cancel</button>
            <button type="submit">Save</button>
        </form>}

        <div className="flex flex-row justify-between items-center mt-[-5px] pt-0">
            <time className="mr-2.5">{post.createdAt.toISOString()}</time>

            <button className="mt-0" onClick={handleToggleLikeClick}>{`${post.liked ? '💗' : '🤍'} (${post.totalLikes})`}</button>

            {post.own && <button className="edit-post" onClick = {handleEditPostTextClick}>✏</button>}

            {post.own && <button className="delete-post" onClick = {handleDeleteClick}>🗑</button>}
        </div>
    </article>
}


