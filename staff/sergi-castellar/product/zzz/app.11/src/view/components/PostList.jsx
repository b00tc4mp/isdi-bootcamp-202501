import { useState, useEffect } from 'react'

import logic from '../../logic.js'
import Post from './Post.jsx'

function PostList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            const posts = logic.getPosts()
            
            setPosts(posts)
        } catch (error) {
            logic.helper.handleError(error)
        }
    }, [])

    const handlePostDeleted = () => { //TODO se repite
        try {
            const posts = logic.getPosts()
            
            setPosts(posts)
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handlePostDescriptionEdited = () => { //TODO se repite
        try {
            const posts = logic.getPosts()
            
            setPosts(posts)
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    const handlePostLikeToggled = () => { //TODO se repite
        try {
            const posts = logic.getPosts()
            
            setPosts(posts)
        } catch (error) {
            logic.helper.handleError(error)
        }
    }
    
    return <section id="posts-section">
        {posts.toReversed().map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} onPostDescriptionEdited={handlePostDescriptionEdited} onPostLikeToggled={handlePostLikeToggled}/>)}
    </section>
}

export default PostList