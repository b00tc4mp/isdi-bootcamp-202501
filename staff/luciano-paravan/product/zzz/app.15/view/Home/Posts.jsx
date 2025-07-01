import { useState, useEffect } from 'react'

import { Post } from './Post.jsx'

import { logic } from '../../logic/index.js'

export function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('Post -> useEffect')
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },[])

    const handlePostLikeToggled = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostDeleted = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)
            
            alert(error.message)
        }
    }

    const handlePostTextEdited = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleSavePost = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Posts -> render')

    return <section>
    {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onSavePost={handleSavePost} onPostTextEdited={handlePostTextEdited}/>)}
</section>
}
