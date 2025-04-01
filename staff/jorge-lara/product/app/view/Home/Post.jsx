import { useState } from 'react';
import { useNavigate } from 'react-router'

import { logic } from '../../logic/index.js';

export function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const [view, setView] = useState('');

    const navigate = useNavigate();

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })

        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handleDeleteClick = () => {
        if (confirm('Delete post?')) {
            try {
                logic.deletePost(post.id)
                    .then(() => onPostDeleted())
                    .catch(error => {
                        console.error(error);

                        alert(error.message);
                    })

            } catch (error) {
                console.error(error);

                alert(error.message);
            }
        }
    }

    const handleEditTextCancelClick = () => setView('');

    const handleEditTextClick = () => setView('edit-text');

    const handleEditTextSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;
            const { text: { value: text } } = form;

            logic.updatePostText(post.id, text)
                .then(() => {
                    onPostTextEdited();

                    setView('');
                })
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleUsernameClick = () => navigate(`/${post.author.username}`, { state: { userId: post.author.id } })

    return <article>
        <h3 onClick={handleUsernameClick}>{post.author.username}</h3>
        <img src={post.image} />


        <div className="post-footer">
            {view === '' && <p>{post.text}</p>}

            {view === 'edit-text' && <form onSubmit={handleEditTextSubmit}>
                <input type='text' id='text' defaultValue={post.text} placeholder='Edit text' />
                <button type='button' onClick={handleEditTextCancelClick}>Cancel</button>
                <button type='submit'>Save</button>
            </form>}

            <button onClick={handleToggleLikeClick}>{`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}</button>
            {post.own && <button onClick={handleDeleteClick}>🗑️</button>}
            {post.own && <button onClick={handleEditTextClick}>📝</button>}
        </div>
        <time>{post.createdAt.toISOString()}</time>
    </article>
}