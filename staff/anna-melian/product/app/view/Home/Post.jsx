import { logic } from '../../logic/index.js'

export function Post({ post, onPostLikeToggled }) {


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

    console.debug('Post --> render')


    return <article key={post.id}>

        <h3>{post.author.username}</h3>

        <img src={post.image} />

        <p>{post.text}</p>

        <div className="post-footer">
            <button onClick={handleToggleLikeClick}> {`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}</button>

            <time style={{ display: 'block' }}>{new Date(post.createdAt).toLocaleDateString('es-ES')}</time>
        </div>

    </article>

}

