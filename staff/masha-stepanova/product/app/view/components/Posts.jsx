const { useState, useEffect } = React

import logic from '../../logic.js'

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('Posts -> useEffect')

        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleLikeClick = (postId) => {
        try {
            logic.likePost(postId)

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
            <article>
                <h3>{post.author.userName}</h3>

                <img src={post.image} />

                <section className="post-underline">
                    <p>{post.text}</p>
                    <button className="like" onClick={() => handleLikeClick(post.id)}>{`${post.liked ? '❤️' : '🤍'} ${post.likesCount}`}</button>
                </section>
                <p>{post.createdAt}</p>
            </article>)}
    </section>
}

export default Posts