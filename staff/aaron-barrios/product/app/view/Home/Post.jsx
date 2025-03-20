import { useState } from 'react'

import { Comment } from './Comment.jsx'

import { logic } from '../../logic/index.js'
import {errors} from 'com'

const { SystemError, ValidationError } = errors

export function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const [view, setView] = useState('')
    const [comments, setComments] = useState([])

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    console.error(error)

                    if (error instanceof SystemError)
                        alert('⛔ ' + error.message)
                    else
                        alert('⚠️ ' + error.message)
                })
        } catch (error) {
            console.error(error)

            if (error instanceof ValidationError)
                alert('❌ ' + error.message)
            else
                alert('⛔ ' + error.message)
        }
    }

    const handleDeleteClick = () => {
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

    const handleCommentsClick = () => setView('comments')

    const handleCancelCommentsClick = () => setView('')

    return <article>
        <div className="post-header">
            <h3>{post.author.username}</h3>
            <time>{logic.formatedDate(post.createdAt)}</time>
        </div>
        <img src={post.image} />

        <p>{post.text}</p>

        <span style={{ marginLeft: ".5rem" }}>
            <button type="button"
                onClick={() => handleToggleLikeClick(post.id)} >{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>

            <h5>{post.likes}</h5>

            <button type="button" onClick={handleCommentsClick}>📃</button>

            {view === 'comments' && <button type="button" onClick={handleCancelCommentsClick}>Cancel</button>}

            {post.own && <button onClick={handleEditTextClick}>✏️</button>}

            {post.own && <button onClick={handleDeleteClick}>🗑️</button>}
        </span>

        <div className="post-footer">
            {/* --- EDIT TEXT SECTION --- */}
            {view === 'edit-text' && < form onSubmit={handleEditTextSubmit}>
                <label htmlFor="text">Text</label>
                <input type="text" id="text" /*defaultValue={post.text} */ />

                <button type="button" onClick={handleEditTextCancelClick}>Cancel</button>
                <button type="submit">Save</button>
            </form>}


            {/* --- COMMENTS SECTION --- */}
            {view === 'comments' && <section>
                {/* {comments.map(comment => <Comment key={comment.id} comment={comment} />)} */}
                <article >
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <img className="comPic" src="https://st3.depositphotos.com/1106647/35463/v/450/depositphotos_354630324-stock-illustration-cute-happy-avocado-character-funny.jpg" />

                        <h3>Aguacate</h3>

                        <time>3d</time>
                    </span>

                    <span >
                        <p>Agua- cate </p>
                        <button type="button">❤️</button>
                    </span>
                </article>

                <article>
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <img className="comPic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhuoV9tsVQPBTvYvcTew6LJOYu8cVcWsPcw&s" />

                        <h3>Banana</h3>

                        <time>5d</time>
                    </span>

                    <span >
                        <p>Ba- nana </p>
                        <button type="button">❤️</button>
                    </span>
                </article>

                <div className='field'>
                    <label htmlFor="comment">Wanna comment?</label>
                    <br />
                    <input type="text" id="comment" />
                </div>
            </section>}

        </div>
    </article >
}