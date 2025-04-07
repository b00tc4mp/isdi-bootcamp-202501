const { useState, useEffect } = React

import logic from '../../logic.js'

function Posts() {
    const [posts, setPosts] = useState([

    ])
    // Actualiza el nombre de usuario cuando se conecta
    useEffect(() => {
        console.debug('Posts -> useEffect')

        try {

            // Obtiene los datos de los posts de Logig
            const posts = logic.getPosts()

            // 
            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleToggleLikePostClick = postId => {
        try {
            logic.toggleLikePost(postId)

            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Posts -> render')

    return <section>
        {posts.map(post =>
            <article key={post.id}>
                <h3 className="userName">{post.userName}</h3>

                <img src={post.image} />

                <div className="data">
                    <p className="postText">{post.text}</p>

                    <button onClick={() => handleToggleLikePostClick(post.id)} className="like" >{`${post.liked ? '🧡' : '🤍'} (${post.likesCount})`} </button>
                </div>
                <time className="time">{post.createdAt.toLocaleString()}</time>

            </article>)}
        <div className="end"></div>
    </section>
}

export default Posts