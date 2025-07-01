import { useState, useEffect } from 'react'

import { Post } from './Post.jsx'

import { logic } from '../../logic/index.js'

export function Posts({ targetUserId }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('Post -> useEffect')

        loadPosts()
    }, [])
    
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

    /*const handleSavePost = () => {
        try {
            const posts = logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }*/

    console.debug('Posts -> render')

    return <section>
    {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted}  onPostTextEdited={handlePostTextEdited} /*onSavePost={handleSavePost}*//>)}
</section>
}
