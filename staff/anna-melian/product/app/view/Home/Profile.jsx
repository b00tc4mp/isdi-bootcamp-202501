const { useState, useEffect } = React

import logic from "../../logic";

function Profile() {
    const [myPosts, setPosts] = useState([])


    useEffect(() => {

        try {
            const myPosts = logic.getOwnPosts()
            setPosts(myPosts)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }

    }, [])


    const handleToggleLikePostClick = postId => {
        try {
            logic.toggleLikePost(postId)

            const myPosts = logic.getOwnPosts()

            setPosts(myPosts)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return <section className="options">
        <h2>My Profile</h2>
        {myPosts.map(post =>
            <article key={post.id}>

                <div className='post-header'>
                    <h3>{post.author.username}</h3>
                    <div className='post-buttons'>
                        <button>🪶</button>
                        <button className="delete-button">🗑️</button>
                    </div>
                </div>

                <img src={post.image} />

                <p>{post.text}</p>

                <div className="post-footer">
                    <button onClick={() => handleToggleLikePostClick(post.id)}> {`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}</button>

                    <time style={{ display: 'block' }}>{new Date(post.createdAt).toLocaleDateString('es-ES')}</time>
                </div>

            </article>
        )}
    </section>

}

export default Profile



/*
(
                <section className="options">
                    <h2>My Profile</h2>

                    {(() => {
                        const { userId } = data
                        const userPosts = posts.filter(post => post.author.id === userId)

                        return userPosts.length > 0 ? (
                            userPosts.map(post => (
                                <article key={post.id}>
                                    

                                    <img src={post.image} alt="Post image" />

                                    <p>{post.text}</p>

                                    <div className="post-footer">
                                        <button onClick={() => handleToggleLikePostClick(post.id)}>
                                            {`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}
                                        </button>

                                        <time >
                                            {new Date(post.createdAt).toLocaleDateString('es-ES')}
                                        </time>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <h4 className="no-posts-message">You haven't created any post.</h4>

                        )
                    })()}
                </section>
            )
*/