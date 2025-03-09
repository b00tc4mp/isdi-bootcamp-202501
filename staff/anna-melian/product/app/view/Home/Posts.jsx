const { useState, useEffect } = React

import logic from "../../logic";
import Post from "./Post";

function Posts() {
    const [posts, setPosts] = useState([])


    useEffect(() => {

        try {
            const posts = logic.getPosts()
            setPosts(posts)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }

    }, [])


    const handleToggleLikePostClick = postId => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return <section>
        {posts.map(post =>
            <Post key={post.id} post={post} onPostLikeToggled={handleToggleLikePostClick} />

        )}
    </section>

}

export default Posts