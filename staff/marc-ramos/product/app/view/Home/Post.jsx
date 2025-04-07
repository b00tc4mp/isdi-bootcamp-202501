import { useState } from 'react'
import { useNavigate } from 'react-router'

import { logic } from '../../logic/index.js'
import { useContext } from '../../context'

export function Post({post, onPostLikeToggled, onPostDeleted, onPostTextEdited}) {
    const { alert, confirm } = useContext()
    const [view, setView] = useState('')

    const navigate = useNavigate()

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
        confirm('Delete post?') // confirm para preguntar si estamos seguros de borrar el post
            .then(accepted => {
                if (accepted)
                    try{
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

    const handleUsernameClick = () => navigate(`/${ post.author.username }`, { state: { userId: post.author.id } })

    console.debug('Post -> render')

    return <article className="mb-8">
          <h3
            className="px-[var(--padding-x)] py-[var(--padding-y)] font-bold cursor-pointer"
            onClick={handleUsernameClick}
          >
            {post.author.username}
          </h3>
      
          <img className="w-full" src={post.image} />
      
          {view === '' && (
            <p className="px-[var(--padding-x)] py-[var(--padding-y)]">{post.text}</p>
          )}
      
          {view === 'edit-text' && (
            <form onSubmit={handleEditTextSubmit} className="px-[var(--padding-x)] py-[var(--padding-y)] flex flex-col gap-2">
              <label htmlFor="text" className="text-sm font-semibold">Text</label>
              <input
                type="text"
                id="text"
                defaultValue={post.text}
                className="bg-[var(--bg-color)] text-[var(--color)] border-2 border-[var(--color)] outline-none font-['Merriweather'] text-base placeholder:text-[var(--color-low)] px-2 py-1"
              />
      
              <div className="flex gap-2">
                <button type="button" className="secondary" onClick={handleEditTextCancelClick}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          )}
      
          <div className="post-footer flex justify-between px-[var(--padding-x)] py-[var(--padding-y)] text-sm items-center">
            <time>
              {new Date(post.createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
      
            <div className="flex gap-2">
              <button onClick={handleToggleLikeClick}>
                {`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}
              </button>
      
              {post.own && <button onClick={handleEditTextClick}>🔖</button>}
              {post.own && <button onClick={handleDeleteClick}>🗑</button>}
            </div>
          </div>
        </article>      
}