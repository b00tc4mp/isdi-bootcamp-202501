import { useState, useEffect } from 'react'

import { logic } from '../../logic/index.js'
import { Post } from './Post.jsx'

export function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {

        try {
            logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }

    }, [])


    const handleToggleLikePostClick = () => {
        try {
            logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    console.debug('Posts -> render')

    return <section>
        {posts.map(post =>
            <Post key={post.id} post={post} onPostLikeToggled={handleToggleLikePostClick} />

        )}
    </section>

}

