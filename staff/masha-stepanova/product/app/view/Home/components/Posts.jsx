import { useState, useEffect } from 'react'

import { logic } from '../../../logic/index.js'

import { Post } from './Post.jsx'

export function Posts({ targetUserId }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('Posts -> useEffect')

        loadPosts()
    }, [targetUserId])

    const loadPosts = () => {
        try {
            (targetUserId ? logic.getUserPosts(targetUserId) : logic.getPosts())
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

    const handlePostLikeToggled = () => loadPosts()

    const handlePostDeleted = () => loadPosts()

    const handlePostTextEdited = () => loadPosts()

    console.debug('Posts -> render')

    return <section>
        {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onPostTextEdited={handlePostTextEdited} />)}
    </section>
}