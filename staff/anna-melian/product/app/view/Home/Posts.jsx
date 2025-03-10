import { useState, useEffect } from 'react'

import { logic } from "../../logic";
import { Post } from "./Post";

export function Posts() {
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


    const handleToggleLikePostClick = () => {
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

