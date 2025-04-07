import { useState } from 'react';
import { useNavigate } from 'react-router'

import { logic } from '../../logic/index.js';
import { useContext } from '../../context.js';

export function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const { alert, confirm } = useContext();
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
        confirm('Delete post?')
            .then(accepted => {
                if (accepted) {
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
            })
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

    return <article className='w-[600px] max-w-[90%] bg-[#181a1b] rounded-lg my-8 p-4 box-border relative pb-8'>
        <h3 className='cursor-pointer' onClick={handleUsernameClick}>{post.author.username}</h3>
        <img className='block w-full h-auto mx-auto' src={post.image} />


        <div className='flex justify-between padding py-[var(--padding-y)] px-[var(--padding-x)]'>
            {view === '' && <p>{post.text}</p>}

            {view === 'edit-text' && <form onSubmit={handleEditTextSubmit}>
                <input type='text' id='text' defaultValue={post.text} placeholder='Edit text' />
                <button type='button' onClick={handleEditTextCancelClick}>Cancel</button>
                <button type='submit'>Save</button>
            </form>}

            <button className='right-4 bg-transparent border-0 py-2 px-4 cursor-pointer outline-none text-white transition-[font-size_0.2s] hover:text-2xl' onClick={handleToggleLikeClick}>{`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}</button>
            {post.own && <button className='right-4 bg-transparent border-0 py-2 px-4 cursor-pointer outline-none text-white transition-[font-size_0.2s] hover:text-2xl' onClick={handleDeleteClick}>🗑️</button>}
            {post.own && <button className='right-4 bg-transparent border-0 py-2 px-4 cursor-pointer outline-none text-white transition-[font-size_0.2s] hover:text-2xl' onClick={handleEditTextClick}>📝</button>}
        </div>
        <time>{post.createdAt.toISOString()}</time>
    </article>
}