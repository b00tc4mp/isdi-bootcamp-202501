const { useState } = React

import logic from '../../logic.js'

function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const [view, setView] = useState('')

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id)

            onPostLikeToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteClick = () => {
        try {
            logic.deletePost(post.id)

            onPostDeleted()
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

            onPostTextEdited()

            setView('')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article>
        <div className="post-header">
            <h3>{post.author.username}</h3>
            <time>{logic.formatedDate(post.createdAt)}</time>
        </div>
        <img src={post.image} />

        <div className="post-footer">
            {view === '' && <p>{post.text}</p>}

            {view === 'edit-text' && < form onSubmit={handleEditTextSubmit}>
                <label htmlFor="text">Text</label>
                <input type="text" id="text" />

                <button type="button" onClick={handleEditTextCancelClick}>Cancel</button>
                <button type="submit">Save</button>
            </form>}

            <button type="button"
                onClick={() => handleToggleLikeClick(post.id)} >{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>

            <h5>{post.likes}</h5>

            <button type="button" onClick={() => commentButtonClick(post.id)}>📃</button>

            {post.own && <button onClick={handleEditTextClick}>✏️</button>}

            {post.own && <button onClick={handleDeleteClick}>🗑️</button>}
        </div>

        {/* --- COMMENTS SECTION ---
    {activeCommentPostId === post.id && <section>
        <article >
            <span>
                <h3>Eugeni</h3>
                <time>3d</time>
            </span>

            <span >
                <p>Vinga Bouuuuusss! </p>
                <button type="button">❤️</button>
                <h5>14</h5>
            </span>
        </article>

        <article>
            <span >
                <h3>Lucho</h3>
                <time>3d</time>
            </span>

            <span >
                <p>Alto alzado...</p>
                <button type="button">❤️</button>
                <h5>8</h5>
            </span>
        </article>

        <label htmlFor="comment">Wanna comment?</label>
        <br />
        <input type="text" id="comment" />
    </section>} */}
    </article >
}

export default Post