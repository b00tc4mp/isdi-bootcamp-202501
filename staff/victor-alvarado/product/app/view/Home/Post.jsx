import { useState } from 'react'
import { useNavigate } from 'react-router'

import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'

export function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const { alert, confirm } = useContext()
    const [view, setView] = useState('')

    const navigate = useNavigate()

    // Maneja el cambio en el like
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
        confirm('Delete post?')
            .then(accepted => {
                if (accepted)
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

    // Cambia la vista para editar el texto del post
    const handleEditTextClick = () => setView('edit-text')

    // Cancela la edición del texto
    const handleEditTextCancelClick = () => setView('')

    // Guarda el nuevo texto después de editar
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

    // Navega al perfil del autor del post
    const handleUsernameClick = () => navigate(`/${post.author.username}`, { state: { userId: post.author.id } })

    console.debug('Post -> render')

    return (
        <article className="max-w-4xl mx-auto my-4 p-6 bg-white text-gray-800 rounded-lg shadow-lg border-4 border-pink-300">
            <h3
                onClick={handleUsernameClick}
                className="flex justify-start items-center gap-[5px] mb-0 pb-0 text-lg font-bold cursor-pointer"
                style={{ fontFamily: 'Bangers, sans-serif', color: '#ff3f34' }}
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
                <form
                    onSubmit={handleEditTextSubmit}
                    className="bg-[var(--color-low)] border-[3px] border-black p-2 rounded-xl mx-auto shadow-[5px_5px_0_black] shadow-[10px_10px_0_yellow] max-w-xs flex flex-col gap-1 mb-0 pb-0"
                >
                    <label
                        htmlFor="text"
                        className="text-xl font-['Jersey_15'] text-yellow-500 drop-shadow-[3px_3px_0_black]"
                    >
                        Edit Text
                    </label>
                    <textarea
                        id="text"
                        defaultValue={post.text}
                        className="text-black bg-yellow-400 border-[3px] border-black p-2 w-full min-h-[100px] rounded-[8px] outline-none shadow-[3px_3px_0_black] focus:border-red-600 text-base"
                        style={{ fontFamily: 'Jersey_15, sans-serif' }}
                    />
                    <div className="flex gap-4 justify-end mt-4">
                        <button
                            type="button"
                            className="font-sans text-sm bg-red-500 text-yellow-500 p-[6px_12px] border-[2px] border-black rounded-[6px] cursor-pointer uppercase shadow-[3px_3px_0_black] transition-all duration-200 hover:bg-yellow-300 active:scale-[0.95]"
                            onClick={handleEditTextCancelClick}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="font-sans text-sm bg-red-500 text-yellow-500 p-[6px_12px] border-[2px] border-black rounded-[6px] cursor-pointer uppercase shadow-[3px_3px_0_black] shadow-[6px_6px_0_yellow] transition-all duration-200 hover:bg-yellow-500 hover:text-red-500 active:scale-[0.95]"
                        >
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