import logic from '../../logic.js'

function Post({post, onToggleLikeClick, onDeleteClick}) {
    const handleToggleLikeClick = () => { // 
        try{
            logic.toggleLikePost(post.id)

            onToggleLikeClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteClick = () => { // handleclick para detectar el click de el boton delete post
        if (confirm('Delete post?')) // confirm para preguntar si estamos seguros de borrar el post
            try{
                logic.deletePost(post.id) // llamamos a la logica de delete post

                onDeleteClick()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    console.debug('Post -> render')

    return <article>
        <h3>{post.author.username}</h3>

        <img src={post.image}/>

        <p>{post.text}</p>

        <div className="post-footer">
            <time>{post.createdAt.toISOString()}</time>

            <button onClick={handleToggleLikeClick}>{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>

            {post.own && <button onClick={handleDeleteClick}>🗑</button>}
        </div>
    </article>
}

export default Post