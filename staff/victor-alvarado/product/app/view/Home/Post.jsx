import { useState } from 'react'
import { useNavigate } from 'react-router'

import { logic } from '../../logic/index.js'

export function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const [view, setView] = useState('')

    const navigate = useNavigate()

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
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

    const handleUsernameClick = () => navigate(`/${post.author.username}`, { state: { userId: post.author.id } })

    console.debug('Post -> render')

    return (
        <article className="max-w-4xl mx-auto my-4 p-6 bg-white text-gray-800 rounded-lg shadow-lg border-4 border-pink-300">
            <h3
                onClick={handleUsernameClick}
                className="flex justify-start items-center gap-[5px] mb-0 pb-0 text-lg font-bold cursor-pointer"
                style={{ fontFamily: 'Bangers, sans-serif', color: '#ff3f34' }} // Cambié el estilo aquí
            >
                {post.author.username}
            </h3>

            <img
                src={post.image}
                alt="Post image"
                className="w-full max-w-[2200px] mx-auto rounded-lg shadow-lg border-4 border-[rgb(244, 20, 20)]"
            />


            {view === '' && (
                <p className="flex justify-start items-center gap-[5px] mb-0 pb-0 text-sm text-gray-800"
                    style={{ fontFamily: 'Bangers, sans-serif', color: '#ff3f34', fontSize: '1.25rem', marginTop: '20px' }}>
                    {post.text}
                </p>
            )}


            {view === 'edit-text' && (
                <form onSubmit={handleEditTextSubmit} className="flex flex-col gap-4 mb-0 pb-0 max-w-3xl mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-gray-50">
                    <label htmlFor="text" className="text-lg font-semibold mb-2 text-gray-800">Edit Text</label>
                    <textarea
                        id="text"
                        defaultValue={post.text}
                        className="border border-gray-300 p-4 rounded-lg text-lg w-full min-h-[150px] focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 font-comic"
                        style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
                    />
                    <div className="flex gap-4 justify-end mt-4">
                        <button type="button" className="bg-gray-200 px-6 py-2 rounded-lg text-lg text-gray-800" onClick={handleEditTextCancelClick}>
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg">
                            Save
                        </button>
                    </div>
                </form>
            )}


            <div className="post-footer flex justify-between items-center gap-[5px] mb-0 pb-0 text-xs">
                <time className="text-gray-500" style={{ color: '#000', fontWeight: 'bold', fontSize: '1rem' }}>
                    {post.createdAt.toISOString()}
                </time>
                <button onClick={handleToggleLikeClick} className="text-gray-800">
                    {`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}
                </button>
                {post.own && (
                    <>
                        <button onClick={handleEditTextClick} className="text-gray-800">📝</button>
                        <button onClick={handleDeleteClick} className="text-gray-800">🗑️</button>
                    </>
                )}
            </div>
        </article>
    )
}